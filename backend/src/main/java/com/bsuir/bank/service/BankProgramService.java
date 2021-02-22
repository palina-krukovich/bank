package com.bsuir.bank.service;

import com.bsuir.bank.entity.BankProgram;
import com.bsuir.bank.entity.common.Constant;
import com.bsuir.bank.repository.BankProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankProgramService {
    private final BankProgramRepository bankProgramRepository;

    public BankProgramService(BankProgramRepository bankProgramRepository) {
        this.bankProgramRepository = bankProgramRepository;
    }

    public BankProgram createBankProgram(BankProgram bankProgram) {
        return bankProgramRepository.save(bankProgram);
    }

    public BankProgram updateBankProgram(BankProgram bankProgram) {
        return createBankProgram(bankProgram);
    }

    public List<BankProgram> findAllBankPrograms() {
        return bankProgramRepository.findAll();
    }

    public List<BankProgram> findDepositBankPrograms() {
        return bankProgramRepository.findByType(Constant.DEPOSIT);
    }

    public List<BankProgram> findCreditBankPrograms() {
        return bankProgramRepository.findByType(Constant.CREDIT);
    }

    public void deleteBankProgram(Long id) {
        bankProgramRepository.deleteById(id);
    }
}
