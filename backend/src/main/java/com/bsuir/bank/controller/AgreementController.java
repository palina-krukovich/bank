package com.bsuir.bank.controller;

import com.bsuir.bank.entity.Agreement;
import com.bsuir.bank.service.AgreementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank/agreement")
public class AgreementController {
    private final AgreementService agreementService;

    public AgreementController(AgreementService agreementService) {
        this.agreementService = agreementService;
    }

    @PostMapping
    public Agreement createAgreement(@RequestBody Agreement agreement) {
        return agreementService.createAgreement(agreement);
    }

    @GetMapping
    public List<Agreement> findAllAgreements() {
        return agreementService.findAllAgreements();
    }

    @GetMapping("/deposit")
    public List<Agreement> findDepositAgreements() {
        return agreementService.findDepositAgreements();
    }

    @GetMapping("/credit")
    public List<Agreement> findCreditAgreements() {
        return agreementService.findCreditAgreements();
    }

    @DeleteMapping
    public void deleteAgreement(@RequestParam Long id) {
        agreementService.deleteAgreement(id);
    }
}
