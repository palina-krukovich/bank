package com.bsuir.bank.service;

import com.bsuir.bank.entity.Account;
import com.bsuir.bank.entity.Transaction;
import com.bsuir.bank.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> findAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> findTransactionsByAccount(Account account) {
        return transactionRepository.findByAccount(account);
    }

    public List<Transaction> findTransactionsByAccountAndReason(Account account, String transactionReason) {
        return transactionRepository.findByAccountAndTransactionReason(account, transactionReason);
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
