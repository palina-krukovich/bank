package com.bsuir.bank.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
public class BankProgram extends BankEntity {
    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @Pattern(regexp = "Deposit|Credit")
    private String type;

    @NotNull
    private String payType;

    @NotNull
    private String currency;

    @NotNull
    @Min(0)
    private Double percentRate;

    @Nullable
    @Min(0)
    private Integer minPeriod;

    @Nullable
    @Min(0)
    private Integer maxPeriod;

    @Nullable
    @Min(0)
    @Column(columnDefinition = "decimal(12,2)")
    private Double minAmount;

    @Nullable
    @Min(0)
    @Column(columnDefinition = "decimal(12,2)")
    private Double maxAmount;


}
