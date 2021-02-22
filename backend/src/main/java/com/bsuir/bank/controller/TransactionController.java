package com.bsuir.bank.controller;

import com.bsuir.bank.entity.Account;
import com.bsuir.bank.entity.Transaction;
import com.bsuir.bank.service.AccountService;
import com.bsuir.bank.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank/transaction")
public class TransactionController {
    private final TransactionService transactionService;
    private final AccountService accountService;

    public TransactionController(
            TransactionService transactionService,
            AccountService accountService) {
        this.transactionService = transactionService;
        this.accountService = accountService;
    }

    @GetMapping
    public List<Transaction> findAllTransactions() {
        return transactionService.findAllTransactions();
    }

    @GetMapping("/account")
    public List<Transaction> findTransactionsByAccount(@RequestParam Long accountId) {
        Account account = this.accountService.findAccountById(accountId);
        return transactionService.findTransactionsByAccount(account);
    }
}
