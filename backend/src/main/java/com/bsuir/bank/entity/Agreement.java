package com.bsuir.bank.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class Agreement extends BankEntity {
    @NotNull
    @Pattern(regexp = "[0-9]+")
    @Column(unique = true)
    private String agreementNumber;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "bank_program_id")
    private BankProgram bankProgram;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private Integer period;

    @NotNull
    @Column(columnDefinition = "decimal(12,2)")
    private double amount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "current_account_id")
    private Account currentAccount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "percent_account_id")
    private Account percentAccount;

    @NotNull
    private Boolean active;

}
