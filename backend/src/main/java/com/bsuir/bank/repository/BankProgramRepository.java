package com.bsuir.bank.repository;

import com.bsuir.bank.entity.BankProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankProgramRepository extends JpaRepository<BankProgram, Long> {
    List<BankProgram> findByType(String type);
}
