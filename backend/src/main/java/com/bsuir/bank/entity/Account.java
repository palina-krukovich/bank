package com.bsuir.bank.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class Account extends BankEntity {
    @NotNull
    private String type;

    @NotNull
    @Pattern(regexp = "[0-9]{13}")
    private String accountNumber;

    @NotNull
    private String activity;
}
