package com.bsuir.bank.controller;

import com.bsuir.bank.entity.Client;
import com.bsuir.bank.service.ClientService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/bank/client")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public Client createClient(@Valid @RequestBody Client client) {
        return clientService.createClient(client);
    }

    @GetMapping
    public List<Client> findAllClients() {
        return clientService.findAllClients();
    }

    @PutMapping
    public Client updateClient(@Valid @RequestBody Client client) {
        return clientService.updateClient(client);
    }

    @DeleteMapping
    public void deleteClient(@RequestParam Long id) {
        clientService.deleteClient(id);
    }


}
