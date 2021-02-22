package com.bsuir.bank.controller;

import com.bsuir.bank.entity.BankProgram;
import com.bsuir.bank.service.BankProgramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank/bank-program")
public class BankProgramController {
    private final BankProgramService bankProgramService;

    public BankProgramController(BankProgramService bankProgramService) {
        this.bankProgramService = bankProgramService;
    }

    @PostMapping
    public BankProgram createBankProgram(@RequestBody BankProgram bankProgram) {
        return bankProgramService.createBankProgram(bankProgram);
    }

    @GetMapping
    public List<BankProgram> findAllBankPrograms() {
        return bankProgramService.findAllBankPrograms();
    }

    @GetMapping("/deposit")
    public List<BankProgram> findDepositBankPrograms() {
        return bankProgramService.findDepositBankPrograms();
    }

    @GetMapping("/credit")
    public List<BankProgram> findCreditBankPrograms() {
        return bankProgramService.findCreditBankPrograms();
    }

    @DeleteMapping
    public void deleteBankProgram(@RequestParam Long id) {
        bankProgramService.deleteBankProgram(id);
    }
}
