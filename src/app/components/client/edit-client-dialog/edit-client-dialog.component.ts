import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Client} from '../../../model/client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CITIES, CITIZENSHIPS, MARITAL_STATUSES, PASSPORT_SERIES_TYPES} from '../../../data/data';

interface DialogData {
  client: Client;
}

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.scss']
})
export class EditClientDialogComponent implements OnInit {
  editClientEvent = new EventEmitter();
  deleteClientEvent = new EventEmitter();

  passportSeriesTypes = PASSPORT_SERIES_TYPES;
  cities = CITIES;
  maritalStatuses = MARITAL_STATUSES;
  citizenships = CITIZENSHIPS;

  surnameControl = this.fb.control(this.data.client.surname, [
    Validators.required,
    Validators.pattern(`[A-Z][a-z]*`)
  ]);
  nameControl = this.fb.control(this.data.client.name, [
    Validators.required,
    Validators.pattern(`[A-Z][a-z]*`)
  ]);
  middleNameControl = this.fb.control(this.data.client.middleName, [
    Validators.required,
    Validators.pattern(`[A-Z][a-z]*`)
  ]);
  birthDateControl = this.fb.control(this.data.client.birthDate, [
    Validators.required
  ]);
  genderControl = this.fb.control(this.data.client.gender, [
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


  passportSeriesControl = this.fb.control(this.data.client.passportSeries, [
    Validators.required,
    Validators.pattern(`[A-Z]{2}`)
  ]);
  passportNumberControl = this.fb.control(this.data.client.passportNumber, [
    Validators.required,
    Validators.pattern(`[0-9]{7}`)
  ]);
  issuedByControl = this.fb.control(this.data.client.issuedBy, [
    Validators.required,
    Validators.pattern(`.*[a-zA-Z].*`)
  ]);
  dateOfIssueControl = this.fb.control(this.data.client.dateOfIssue, [
    Validators.required
  ]);
  idNumberControl = this.fb.control(this.data.client.idNumber, [
    Validators.required,
    Validators.pattern(`[0-9]{7}[A-Z][0-9]{3}[A-Z]{2}[0-9]`)]
  );
  placeOfBirthControl = this.fb.control(this.data.client.placeOfBirth, [
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


  cityControl = this.fb.control(this.data.client.city, [
    Validators.required,
  ]);
  addressControl = this.fb.control(this.data.client.address, [
    Validators.required
  ]);
  maritalStatusControl = this.fb.control(this.data.client.maritalStatus, [
    Validators.required
  ]);
  citizenshipControl = this.fb.control(this.data.client.citizenship, [
    Validators.required
  ]);
  disabilityControl = this.fb.control(this.data.client.disability.toString(), [
    Validators.required,
    Validators.pattern('[0-3]')]
  );
  retiredControl = this.fb.control(this.data.client.retired, [
    Validators.required
  ]);
  boundToMilitaryServiceControl = this.fb.control(this.data.client.boundToMilitaryService, [
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
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<EditClientDialogComponent>
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
    this.httpService.updateClient({
      id: this.data.client.id,
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
      this.snackBar.open('Saved!');
      this.editClientEvent.emit();
      this.data.client.id = client.id;
    }, (error) => {
      this.snackBar.open('Failed to add client');
    });
  }

  delete(): void {
    if (this.data.client.id) {
      this.httpService.removeClient(this.data.client.id).toPromise().finally(() => {
        this.deleteClientEvent.emit();
        this.dialogRef.close();
      });
    }
  }

}
