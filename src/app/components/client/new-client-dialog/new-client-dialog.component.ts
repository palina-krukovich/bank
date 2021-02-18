import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../services/http.service';
import {Client} from '../../../model/client';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CITIES, CITIZENSHIPS, MARITAL_STATUSES, PASSPORT_SERIES_TYPES} from '../../../data/data';

@Component({
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.scss']
})
export class NewClientDialogComponent implements OnInit {
  newClientEvent = new EventEmitter<Client>();
  passportSeriesTypes = PASSPORT_SERIES_TYPES;
  cities = CITIES;
  maritalStatuses = MARITAL_STATUSES;
  citizenships = CITIZENSHIPS;


  surnameControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(`[A-Z][a-z]*`)
  ]);
  nameControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(`[A-Z][a-z]*`)
  ]);
  middleNameControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(`[A-Z][a-z]*`)
  ]);
  birthDateControl = this.fb.control('', [
    Validators.required
  ]);
  genderControl = this.fb.control('M', [
    Validators.required,
    Validators.pattern(`[MF]`)
  ]);

  firstStepFormGroup: FormGroup = this.fb.group({
    surname: this.surnameControl,
    name: this.nameControl,
    middleName: this.middleNameControl,
    birthDate: this.birthDateControl,
    gender: this.genderControl
  });


  passportSeriesControl = this.fb.control('MC', [
    Validators.required,
    Validators.pattern(`[A-Z]{2}`)
  ]);
  passportNumberControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(`[0-9]{7}`)
  ]);
  issuedByControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(`.*[a-zA-Z].*`)
  ]);
  dateOfIssueControl = this.fb.control('', [
    Validators.required
  ]);
  idNumberControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(`[0-9]{7}[A-Z][0-9]{3}[A-Z]{2}[0-9]`)]
  );
  placeOfBirthControl = this.fb.control('', [
    Validators.required,
    Validators.pattern(`.*[a-zA-Z].*`)
  ]);

  secondStepFormGroup: FormGroup = this.fb.group({
    passportSeries: this.passportSeriesControl,
    passportNumber: this.passportNumberControl,
    issuedBy: this.issuedByControl,
    dateOfIssue: this.dateOfIssueControl,
    idNumber: this.idNumberControl,
    placeOfBirth: this.placeOfBirthControl
  });


  cityControl = this.fb.control('Minsk', [
    Validators.required,
  ]);
  addressControl = this.fb.control('', [
    Validators.required
  ]);
  maritalStatusControl = this.fb.control('Single', [
    Validators.required
  ]);
  citizenshipControl = this.fb.control('Belarusian', [
    Validators.required
  ]);
  disabilityControl = this.fb.control('0', [
    Validators.required,
    Validators.pattern('[0-3]')]
  );
  retiredControl = this.fb.control(false, [
    Validators.required
  ]);
  boundToMilitaryServiceControl = this.fb.control(false, [
    Validators.required
  ]);

  thirdStepFormGroup: FormGroup = this.fb.group({
    city: this.cityControl,
    address: this.addressControl,
    maritalStatus: this.maritalStatusControl,
    citizenship: this.citizenshipControl,
    disability: this.disabilityControl,
    retired: this.retiredControl,
    boundToMilitaryService: this.boundToMilitaryServiceControl
  });


  homeNumberControl = this.fb.control('', [
    Validators.pattern(`[0-9]{6}`)
  ]);
  mobileNumberControl = this.fb.control('', [
    Validators.pattern(`[0-9]{9}`)
  ]);
  emailControl = this.fb.control('', [
    Validators.email
  ]);
  monthlyIncomeControl = this.fb.control('', [
    Validators.pattern(`[0-9]{1,15}(\.[0-9]{1,2})?`)
  ]);

  forthStepFormGroup: FormGroup = this.fb.group({
    homeNumber: this.homeNumberControl,
    mobileNumber: this.mobileNumberControl,
    email: this.emailControl,
    monthlyIncome: this.monthlyIncomeControl
  });


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

  }

  get formReady(): boolean {
    return this.firstStepFormGroup.valid &&
      this.secondStepFormGroup.valid &&
      this.thirdStepFormGroup.valid &&
      this.forthStepFormGroup.valid;
  }

  save(): void {
    console.log(this.birthDateControl.value);
    this.httpService.addClient({
      surname: this.surnameControl.value,
      name: this.nameControl.value,
      middleName: this.middleNameControl.value,
      birthDate: this.birthDateControl.value,
      gender: this.genderControl.value,
      passportSeries: this.passportSeriesControl.value,
      passportNumber: this.passportNumberControl.value,
      issuedBy: this.issuedByControl.value,
      dateOfIssue: this.dateOfIssueControl.value,
      idNumber: this.idNumberControl.value,
      placeOfBirth: this.placeOfBirthControl.value,
      city: this.cityControl.value,
      address: this.addressControl.value,
      homeNumber: this.homeNumberControl.value,
      mobileNumber: this.mobileNumberControl.value,
      email: this.emailControl.value,
      maritalStatus: this.maritalStatusControl.value,
      citizenship: this.citizenshipControl.value,
      disability: this.disabilityControl.value,
      retired: this.retiredControl.value,
      monthlyIncome: this.monthlyIncomeControl.value,
      boundToMilitaryService: this.boundToMilitaryServiceControl.value
    }).subscribe((client: Client) => {
      this.snackBar.open('Added!');
      this.newClientEvent.emit(client);
    }, (error) => {
      this.snackBar.open(error.message);
    });
  }
}
