package com.bsuir.bank.controller;

import com.bsuir.bank.util.BankUtil;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("/bank")
public class BankController {

    private final BankUtil bankUtil;

    public BankController(BankUtil bankUtil) {
        this.bankUtil = bankUtil;
    }

    @PutMapping("/close-bank-day")
    public void closeBankDay() {
        bankUtil.closeBankDay();
    }

    @GetMapping("/bank-date")
    public LocalDate getDate() {
        return bankUtil.getCurrentDate();
    }

}
