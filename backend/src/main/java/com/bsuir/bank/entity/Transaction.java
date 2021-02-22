package com.bsuir.bank.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "account_transaction")
public class Transaction extends BankEntity {
    @Null
    @Column(columnDefinition = "decimal(12,2)")
    private Double debit;

    @Null
    @Column(columnDefinition = "decimal(12,2)")
    private Double credit;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    private String transactionReason;

    @NotNull
    private String currency;

}
