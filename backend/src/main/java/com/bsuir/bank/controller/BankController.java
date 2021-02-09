package com.bsuir.bank.controller;

import com.bsuir.bank.entity.Client;
import com.bsuir.bank.repository.ClientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/")
public class BankController {

  private ClientRepository clientRepository;

  public BankController(ClientRepository clientRepository) {
    this.clientRepository = clientRepository;
  }

  @GetMapping(value = "client")
  public List<Client> findClients() {
    return clientRepository.findAll();
  }

  @PostMapping(value = "client")
  public Client saveClient(@Valid @RequestBody Client client) {
    return clientRepository.save(client);
  }

  @DeleteMapping(value = "client")
  public String deleteClient(@RequestParam Long id) {
    if (clientRepository.existsById(id)) {
      clientRepository.deleteById(id);
      return "Successfully deleted Client #" + id.toString();
    }
    return "There is no Client #" + id.toString();
  }

  @PutMapping(value = "client")
  public Client updateClient(@Valid @RequestBody Client client) {
    if (clientRepository.existsById(client.getId())) {
      clientRepository.deleteById(client.getId());
    }
    return clientRepository.save(client);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult()
        .getAllErrors()
        .forEach(
            (error) -> {
              String fieldName = ((FieldError) error).getField();
              String errorMessage = error.getDefaultMessage();
              errors.put(fieldName, errorMessage);
            });
    return errors;
  }
}

