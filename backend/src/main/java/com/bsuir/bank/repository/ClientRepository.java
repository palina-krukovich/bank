package com.bsuir.bank.repository;

import com.bsuir.bank.entity.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    @Override
    List<Client> findAll();

    @Override
    void deleteById(Long id);

    @Override
    boolean existsById(Long id);

}
