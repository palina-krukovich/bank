package com.bsuir.bank.service;

import com.bsuir.bank.entity.Account;
import com.bsuir.bank.entity.common.Constant;
import com.bsuir.bank.repository.AccountRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account findBankAccount() {
        return accountRepository.findByType(Constant.ACCOUNT_BANK)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ServiceException("No Bank Account found"));
    }

    public Account findAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }
}
