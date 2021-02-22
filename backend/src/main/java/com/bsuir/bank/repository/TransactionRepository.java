package com.bsuir.bank.repository;

import com.bsuir.bank.entity.Account;
import com.bsuir.bank.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccount(Account account);

    List<Transaction> findByAccountAndTransactionReason(Account account, String transactionReason);
}
