package com.bsuir.bank.entity;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.sql.Date;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"passportSeries", "passportNumber"})})
public class Client {
  @Id
  @NonNull
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NonNull
  @NotBlank(message = "Surname is mandatory")
  @Pattern(regexp = "[A-Z][a-z]*")
  private String surname;

  @NonNull
  @NotBlank(message = "Name is mandatory")
  @Pattern(regexp = "[A-Z][a-z]*")
  private String name;

  @NonNull
  @NotBlank(message = "MiddleName is mandatory")
  @Pattern(regexp = "[A-Z][a-z]*")
  private String middleName;

  @NonNull private Date birthDate;

  @NonNull
  @Size(min = 1, max = 1, message = "Use 1 character for gender")
  @Pattern(regexp = "[MF]", message = "Choose M or F for the gender")
  private String gender;

  @NonNull
  @Size(min = 2, max = 2, message = "Passport Series should be 2 characters")
  @Pattern(regexp = "AB|BM|HB|KH|MP|MC|KB|PP|SP|DP", message = "Passport Series is invalid")
  private String passportSeries;

  @NonNull
  @Size(min = 7, max = 7, message = "Passport Number should be 7 characters")
  @Pattern(regexp = "[0-9]{7}", message = "Passport Number is invalid")
  private String passportNumber;

  @NonNull @NotBlank(message = "Issued By is mandatory") private String issuedBy;

  @NonNull private Date dateOfIssue;

  @NonNull
  @Size(min = 14, max = 14, message = "ID Number should be 14 characters")
  @Pattern(regexp = "[1-6][0-9]{6}[ABCKEMH][0-9]{3}(PB|BA|BI)[0-9]", message = "ID Number is invalid")
  @Column(unique = true)
  private String idNumber;

  @NonNull @NotBlank(message = "Place of Birth is mandatory") private String placeOfBirth;

  @NonNull @NotBlank(message = "Actual Residence City is mandatory") private String actualResidenceCity;

  @NonNull @NotBlank(message = "Actual Residence Address is mandatory") private String actualResidenceAddress;

  @Nullable
  @Size(min = 6, max = 6, message = "Home Number should be 6 characters")
  @Pattern(regexp = "[0-9]{6}", message = "Home Number is invalid")
  private String homeNumber;

  @Nullable
  @Size(min = 13, max = 13, message = "Mobile Number should be 13 characters")
  @Pattern(regexp = "(29|33|44|25)[0-9]{7}", message = "Mobile Number is invalid")
  private String mobileNumber;

  @Nullable @Email(message = "Email Address is invalid") private String email;

  @NotNull @NotBlank(message = "Marital Status is mandatory") private String maritalStatus;

  @NonNull @NotBlank(message = "Nationality is mandatory") private String nationality;

  @NonNull
  @Min(value = 0, message = "Disability level can't be less then 0")
  @Max(value = 3, message = "Disability level can't be higher then 3")
  private int disability;

  @NonNull private boolean retired;

  @Nullable
  @Column(columnDefinition = "money")
  private double monthlyIncome;

  @NotNull private boolean boundToMilitaryService;

  @NonNull
  public Long getId() {
    return id;
  }

  @NonNull
  public String getSurname() {
    return surname;
  }

  @NonNull
  public String getName() {
    return name;
  }

  @NonNull
  public String getMiddleName() {
    return middleName;
  }

  @NonNull
  public Date getBirthDate() {
    return birthDate;
  }

  @NonNull
  public String getGender() {
    return gender;
  }

  @NonNull
  public String getPassportSeries() {
    return passportSeries;
  }

  @NonNull
  public String getPassportNumber() {
    return passportNumber;
  }

  @NonNull
  public String getIssuedBy() {
    return issuedBy;
  }

  @NonNull
  public Date getDateOfIssue() {
    return dateOfIssue;
  }

  @NonNull
  public String getIdNumber() {
    return idNumber;
  }

  @NonNull
  public String getPlaceOfBirth() {
    return placeOfBirth;
  }

  @NonNull
  public String  getActualResidenceCity() {
    return actualResidenceCity;
  }

  @NonNull
  public String getActualResidenceAddress() {
    return actualResidenceAddress;
  }

  @Nullable
  public String getHomeNumber() {
    return homeNumber;
  }

  @Nullable
  public String getMobileNumber() {
    return mobileNumber;
  }

  @Nullable
  public String getEmail() {
    return email;
  }

  public String getMaritalStatus() {
    return maritalStatus;
  }

  @NonNull
  public String getNationality() {
    return nationality;
  }

  public int getDisability() {
    return disability;
  }

  public boolean isRetired() {
    return retired;
  }

  public double getMonthlyIncome() {
    return monthlyIncome;
  }

  public boolean isBoundToMilitaryService() {
    return boundToMilitaryService;
  }

  public void setId(@NonNull Long id) {
    this.id = id;
  }

  public void setSurname(@NonNull String surname) {
    this.surname = surname;
  }

  public void setName(@NonNull String name) {
    this.name = name;
  }

  public void setMiddleName(@NonNull String middleName) {
    this.middleName = middleName;
  }

  public void setBirthDate(@NonNull Date birthDate) {
    this.birthDate = birthDate;
  }

  public void setGender(@NonNull String gender) {
    this.gender = gender;
  }

  public void setPassportSeries(@NonNull String passportSeries) {
    this.passportSeries = passportSeries;
  }

  public void setPassportNumber(@NonNull String passportNumber) {
    this.passportNumber = passportNumber;
  }

  public void setIssuedBy(@NonNull String issuedBy) {
    this.issuedBy = issuedBy;
  }

  public void setDateOfIssue(@NonNull Date dateOfIssue) {
    this.dateOfIssue = dateOfIssue;
  }

  public void setIdNumber(@NonNull String idNumber) {
    this.idNumber = idNumber;
  }

  public void setPlaceOfBirth(@NonNull String placeOfBirth) {
    this.placeOfBirth = placeOfBirth;
  }

  public void setActualResidenceCity(@NonNull String actualResidenceCity) {
    this.actualResidenceCity = actualResidenceCity;
  }

  public void setActualResidenceAddress(@NonNull String actualResidenceAddress) {
    this.actualResidenceAddress = actualResidenceAddress;
  }

  public void setHomeNumber(@Nullable String homeNumber) {
    this.homeNumber = homeNumber;
  }

  public void setMobileNumber(@Nullable String mobileNumber) {
    this.mobileNumber = mobileNumber;
  }

  public void setEmail(@Nullable String email) {
    this.email = email;
  }

  public void setMaritalStatus(String maritalStatus) {
    this.maritalStatus = maritalStatus;
  }

  public void setNationality(@NonNull String nationality) {
    this.nationality = nationality;
  }

  public void setDisability(int disability) {
    this.disability = disability;
  }

  public void setRetired(boolean retired) {
    this.retired = retired;
  }

  public void setMonthlyIncome(double monthlyIncome) {
    this.monthlyIncome = monthlyIncome;
  }

  public void setBoundToMilitaryService(boolean boundToMilitaryService) {
    this.boundToMilitaryService = boundToMilitaryService;
  }
}
