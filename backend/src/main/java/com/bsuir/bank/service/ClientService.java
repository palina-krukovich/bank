package com.bsuir.bank.service;

import com.bsuir.bank.entity.Client;
import com.bsuir.bank.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
  private final ClientRepository clientRepository;

  public ClientService(ClientRepository clientRepository) {
    this.clientRepository = clientRepository;
  }

  public Client createClient(Client client) {
    return clientRepository.save(client);
  }

  public Client updateClient(Client client) {
    return createClient(client);
  }

  public void deleteClient(Long id) {
    if (clientRepository.existsById(id)) {
      clientRepository.deleteById(id);
    }
  }

  public List<Client> findAllClients() {
    return clientRepository.findAll();
  }
}
