package com.bsuir.bank.service;

import com.bsuir.bank.entity.Agreement;
import com.bsuir.bank.entity.common.Constant;
import com.bsuir.bank.repository.AgreementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgreementService {
  private final AgreementRepository agreementRepository;

  public AgreementService(AgreementRepository agreementRepository) {
    this.agreementRepository = agreementRepository;
  }

  public Agreement createAgreement(Agreement agreement) {
    return agreementRepository.save(agreement);
  }

  public Agreement updateAgreement(Agreement agreement) {
    return createAgreement(agreement);
  }

  public List<Agreement> findAllAgreements() {
    return agreementRepository.findAll();
  }

  public List<Agreement> findActiveAgreements() {
    return agreementRepository.findAgreementByActive(true);
  }

  public List<Agreement> findDepositAgreements() {
    return agreementRepository.findAll().stream()
        .filter(agreement -> Constant.DEPOSIT.equals(agreement.getBankProgram().getType()))
        .collect(Collectors.toList());
  }

  public List<Agreement> findCreditAgreements() {
      return agreementRepository.findAll().stream()
              .filter(agreement -> Constant.CREDIT.equals(agreement.getBankProgram().getType()))
              .collect(Collectors.toList());
  }

  public void deleteAgreement(Long id) {
    agreementRepository.deleteById(id);
  }
}
