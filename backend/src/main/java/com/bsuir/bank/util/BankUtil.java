package com.bsuir.bank.util;

import com.bsuir.bank.entity.Account;
import com.bsuir.bank.entity.Agreement;
import com.bsuir.bank.entity.Transaction;
import com.bsuir.bank.entity.common.Constant;
import com.bsuir.bank.service.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BankUtil {
  private LocalDate currentDate = LocalDate.of(2021, 4, 5);

  private final AgreementService agreementService;
  private final AccountService accountService;
  private final TransactionService transactionService;

  public BankUtil(
      AgreementService agreementService,
      AccountService accountService,
      TransactionService transactionService) {
    this.agreementService = agreementService;
    this.accountService = accountService;
    this.transactionService = transactionService;
  }

  public void closeBankDay() {
    List<Agreement> activeAgreements =
        agreementService.findActiveAgreements().stream()
            .filter(agreement -> !currentDate.isBefore(agreement.getStartDate()))
            .collect(Collectors.toList());

    Account bankAccount = accountService.findBankAccount();

    for (Agreement agreement : activeAgreements) {
      String agreementType = agreement.getBankProgram().getType();
      if (Constant.DEPOSIT.equals(agreementType)) {
        processDeposit(agreement, bankAccount);
      } else if (Constant.CREDIT.equals(agreementType)) {
        processCredit(agreement, bankAccount);
      }
    }
    currentDate = currentDate.plusDays(1);
  }

  public LocalDate getCurrentDate() {
    return currentDate;
  }

  private void processDeposit(Agreement agreement, Account bankAccount) {
    if (currentDate.isEqual(agreement.getStartDate())) {
      startDeposit(agreement, bankAccount);
      return;
    }
    boolean isRevocable = Constant.DEPOSIT_REVOCABLE.equals(agreement.getBankProgram().getPayType());
    double monthlyPercent = round(agreement.getBankProgram().getPercentRate() * agreement.getAmount() / 100 / 12);
    if (isRevocable && currentDate.getDayOfMonth() == agreement.getStartDate().getDayOfMonth()) {
      addDepositPercent(agreement, bankAccount, monthlyPercent);
    }
    LocalDate endDate = agreement.getStartDate().plusMonths(agreement.getPeriod());
    if (currentDate.isEqual(endDate)) {
      boolean isIrrevocable = Constant.DEPOSIT_IRREVOCABLE.equals(agreement.getBankProgram().getPayType());
      double totalPercent = round(monthlyPercent * agreement.getPeriod());
      if (isIrrevocable) {
        addDepositPercent(agreement, bankAccount, totalPercent);
      }
      endDeposit(agreement, bankAccount, totalPercent);
      endAgreement(agreement);
    }
  }

  private void startDeposit(Agreement agreement, Account bankAccount) {
    double amount = agreement.getAmount();
    Account currentAccount = agreement.getCurrentAccount();
    String currency = agreement.getBankProgram().getCurrency();

    transactionService.createTransaction(
        new Transaction(0., amount, currentAccount, Constant.DEPOSIT_TO_CURRENT, currency));
    transactionService.createTransaction(
        new Transaction(
            amount, 0., currentAccount, Constant.DEPOSIT_FROM_CURRENT_TO_BANK, currency));
    transactionService.createTransaction(
        new Transaction(0., amount, bankAccount, Constant.DEPOSIT_FROM_CURRENT_TO_BANK, currency));
  }

  private void addDepositPercent(Agreement agreement, Account bankAccount, double percentAmount) {
    String currency = agreement.getBankProgram().getCurrency();
    Account percentAccount = agreement.getPercentAccount();

    transactionService.createTransaction(
        new Transaction(percentAmount, 0., bankAccount, Constant.DEPOSIT_PERCENT_FROM_BANK_TO_PERCENT, currency));
    transactionService.createTransaction(
        new Transaction(0., percentAmount, percentAccount, Constant.DEPOSIT_PERCENT_FROM_BANK_TO_PERCENT, currency));
  }

  private void endDeposit(Agreement agreement, Account bankAccount, double totalPercent) {
    Account currentAccount = agreement.getCurrentAccount();
    Account percentAccount = agreement.getPercentAccount();
    double amount = agreement.getAmount();
    String currency = agreement.getBankProgram().getCurrency();

    transactionService.createTransaction(
        new Transaction(totalPercent, 0., percentAccount, Constant.DEPOSIT_PERCENT_FROM_PERCENT, currency));
    transactionService.createTransaction(
        new Transaction(amount, 0., bankAccount, Constant.DEPOSIT_FROM_BANK_TO_CURRENT, currency));
    transactionService.createTransaction(
        new Transaction(0., amount, currentAccount, Constant.DEPOSIT_FROM_BANK_TO_CURRENT, currency));
    transactionService.createTransaction(
        new Transaction(amount, 0., currentAccount, Constant.DEPOSIT_FROM_CURRENT, currency));
  }


  private void processCredit(Agreement agreement, Account bankAccount) {
    if (currentDate.isEqual(agreement.getStartDate())) {
      startCredit(agreement, bankAccount);
      return;
    }
    if (currentDate.getDayOfMonth() == agreement.getStartDate().getDayOfMonth()) {
      boolean isAnnuity = Constant.CREDIT_ANNUITY.equals(agreement.getBankProgram().getPayType());
      boolean isDifferentiated = Constant.CREDIT_DIFFERENTIATED.equals(agreement.getBankProgram().getPayType());
      if (isAnnuity) {
        addAnnuityCreditPay(agreement, bankAccount);
      } else if (isDifferentiated) {
        addDifferentiatedCreditPay(agreement, bankAccount);
      }
    }
    if (currentDate.isEqual(agreement.getStartDate().plusMonths(agreement.getPeriod()))) {
      endAgreement(agreement);
    }
  }

  private void startCredit(Agreement agreement, Account bankAccount) {
    Account currentAccount = agreement.getCurrentAccount();
    double amount = agreement.getAmount();
    String currency = agreement.getBankProgram().getCurrency();

    transactionService.createTransaction(
        new Transaction(amount, 0., bankAccount, Constant.CREDIT_FROM_BANK_TO_CURRENT, currency));
    transactionService.createTransaction(
        new Transaction(amount, 0., currentAccount, Constant.CREDIT_FROM_BANK_TO_CURRENT, currency));
    transactionService.createTransaction(
        new Transaction(0., amount, currentAccount, Constant.CREDIT_FROM_CURRENT, currency));
  }

  private void addAnnuityCreditPay(Agreement agreement, Account bankAccount) {
    double rate = agreement.getBankProgram().getPercentRate();
    double amount = agreement.getAmount();
    int period = agreement.getPeriod();

    double monthlyRate = rate / 100 / 12;
    double monthlyPay = round(amount * (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, period) - 1)));
    double creditDebt = calculateCreditDebt(amount, agreement.getCurrentAccount());
    double percentAmount = round(creditDebt * monthlyRate);
    double currentAmount = round(monthlyPay - percentAmount);

    addCreditPay(agreement, bankAccount, currentAmount, percentAmount);
  }

  private void addDifferentiatedCreditPay(Agreement agreement, Account bankAccount) {
    double rate = agreement.getBankProgram().getPercentRate();
    double amount = agreement.getAmount();
    int period = agreement.getPeriod();

    double creditDebt = calculateCreditDebt(amount, agreement.getCurrentAccount());
    double monthlyRate = rate / 100 / 12;
    double currentAmount = round(amount / period);
    double percentAmount = round(creditDebt * monthlyRate);

    addCreditPay(agreement, bankAccount, currentAmount, percentAmount);
  }

  private void addCreditPay(Agreement agreement, Account bankAccount, double currentAmount, double percentAmount) {
    Account currentAccount = agreement.getCurrentAccount();
    Account percentAccount = agreement.getPercentAccount();
    String currency = agreement.getBankProgram().getCurrency();

    transactionService.createTransaction(
        new Transaction(currentAmount, 0., currentAccount, Constant.CREDIT_TO_CURRENT, currency));
    transactionService.createTransaction(
        new Transaction(percentAmount, 0., percentAccount, Constant.CREDIT_PERCENT_TO_PERCENT, currency));
    transactionService.createTransaction(
        new Transaction(0., currentAmount, currentAccount, Constant.CREDIT_FROM_CURRENT_TO_BANK, currency));
    transactionService.createTransaction(
            new Transaction(0., currentAmount, bankAccount, Constant.CREDIT_FROM_CURRENT_TO_BANK, currency));
    transactionService.createTransaction(
        new Transaction(0., percentAmount, percentAccount, Constant.CREDIT_PERCENT_FROM_PERCENT_TO_BANK, currency));
    transactionService.createTransaction(
        new Transaction(0., percentAmount, bankAccount, Constant.CREDIT_PERCENT_FROM_PERCENT_TO_BANK, currency));
  }

  private double calculateCreditDebt(double amount, Account currentAccount) {
    double totalCurrentAccountPay =
        transactionService
            .findTransactionsByAccountAndReason(currentAccount, Constant.CREDIT_TO_CURRENT)
            .stream()
            .map(Transaction::getDebit)
            .reduce(0., Double::sum);
    return round(amount - round(totalCurrentAccountPay));
  }


  private void endAgreement(Agreement agreement) {
    agreement.setActive(false);
    agreementService.updateAgreement(agreement);
  }

  private double round(double value) {
    BigDecimal bd = BigDecimal.valueOf(value);
    bd = bd.setScale(2, RoundingMode.HALF_UP);
    return bd.doubleValue();
  }
}
