package com.bsuir.bank.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"passportSeries", "passportNumber"})})
public class Client extends BankEntity {

  @NotNull
  @Pattern(regexp = "[A-Za-z]+")
  private String surname;

  @NotNull
  @Pattern(regexp = "[A-Za-z]+")
  private String name;

  @NotNull
  @Pattern(regexp = "[A-Za-z]+")
  private String middleName;

  @NotNull
  private LocalDate birthDate;

  @NotNull
  @Pattern(regexp = "[MF]")
  private String gender;

  @NotNull
  @Pattern(regexp = "[A-Z]{2}")
  private String passportSeries;

  @NotNull
  @Pattern(regexp = "[0-9]{7}")
  private String passportNumber;

  @NotNull
  @NotBlank()
  private String issuedBy;

  @NotNull
  private LocalDate dateOfIssue;

  @NotNull
  @Pattern(regexp = "[0-9]{7}[A-Z][0-9]{3}[A-Z]{2}[0-9]")
  @Column(unique = true)
  private String idNumber;

  @NotNull
  @NotBlank
  private String placeOfBirth;

  @NotNull
  private String city;

  @NotNull
  @NotBlank
  private String address;

  @Null
  @Pattern(regexp = "[0-9]{6}")
  private String homeNumber;

  @Null
  @Pattern(regexp = "[0-9]{9}")
  private String mobileNumber;

  @Null
  @Email
  private String email;

  @NotNull
  private String maritalStatus;

  @NotNull
  private String citizenship;

  @NotNull
  @Pattern(regexp = "[0-3]")
  private String disability;

  @NotNull
  private Boolean retired;

  @Null
  @Column(columnDefinition = "decimal(12,2)")
  private Double monthlyIncome;

  @NotNull
  private Boolean boundToMilitaryService;

}
