import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Client} from '../../model/client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
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

  passportSeriesTypes = ['AB', 'BM', 'HB', 'KH', 'MP', 'MC', 'KB', 'PP', 'SP', 'DP'];
  idNumberPattern = `[1-6][0-9]{6}[ABCKEMH][0-9]{3}(PB|BA|BI)[0-9]`;
  cities = ['Minsk', 'Gomel', 'Grodno', 'Brest', 'Soligorsk', 'Mogilev', 'Vitebsk'];
  maritalStatuses = ['Single', 'Married', 'Widowed', 'Divorced', 'Separated'];
  nationalities = ['Republic of Belarus'];

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
    Validators.pattern(`[FM]`)
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
    Validators.minLength(2),
    Validators.maxLength(2),
    Validators.pattern(`AB|BM|HB|KH|MP|MC|KB|PP|SP|DP`)
  ]);
  passportNumberControl = this.fb.control(this.data.client.passportNumber, [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(7),
    Validators.pattern(`[0-9]{7}`)
  ]);
  issuedByControl = this.fb.control(this.data.client.issuedBy, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern(`.*[a-zA-Z].*`)
  ]);
  dateOfIssueControl = this.fb.control(this.data.client.dateOfIssue, [
    Validators.required
  ]);
  idNumberControl = this.fb.control(this.data.client.idNumber, [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
    Validators.pattern(this.idNumberPattern)]
  );
  placeOfBirthControl = this.fb.control(this.data.client.placeOfBirth, [
    Validators.required,
    Validators.minLength(1),
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


  actualResidenceCityControl = this.fb.control(this.data.client.actualResidenceCity, [
    Validators.required,
  ]);
  actualResidenceAddressControl = this.fb.control(this.data.client.actualResidenceAddress, [
    Validators.required
  ]);
  maritalStatusControl = this.fb.control(this.data.client.maritalStatus, [
    Validators.required
  ]);
  nationalityControl = this.fb.control(this.data.client.nationality, [
    Validators.required
  ]);
  disabilityControl = this.fb.control(this.data.client.disability.toString(), [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(1),
    Validators.pattern('[0-3]')]
  );
  retiredControl = this.fb.control(this.data.client.retired, [
    Validators.required
  ]);
  boundToMilitaryServiceControl = this.fb.control(this.data.client.boundToMilitaryService, [
    Validators.required
  ]);

  thirdStepFormGroup: FormGroup = this.fb.group({
    actualResidenceCity: this.actualResidenceCityControl,
    actualResidenceAddress: this.actualResidenceAddressControl,
    maritalStatus: this.maritalStatusControl,
    nationality: this.nationalityControl,
    disability: this.disabilityControl,
    retired: this.retiredControl,
    boundToMilitaryService: this.boundToMilitaryServiceControl
  });


  homeNumberControl = this.fb.control('', [
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(`[0-9]{6}`)
  ]);
  mobileNumberControl = this.fb.control('', [
    Validators.minLength(9),
    Validators.maxLength(9),
    Validators.pattern(`(29|33|44|25)[0-9]{7}`)
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
      actualResidenceCity: this.actualResidenceCityControl.value,
      actualResidenceAddress: this.actualResidenceAddressControl.value,
      homeNumber: this.homeNumberControl.value,
      mobileNumber: this.mobileNumberControl.value,
      email: this.emailControl.value,
      maritalStatus: this.maritalStatusControl.value,
      nationality: this.nationalityControl.value,
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
