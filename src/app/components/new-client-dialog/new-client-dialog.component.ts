import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {Client} from '../../model/client';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.scss']
})
export class NewClientDialogComponent implements OnInit {

  newClientEvent = new EventEmitter<Client>();

  passportSeriesTypes = ['AB', 'BM', 'HB', 'KH', 'MP', 'MC', 'KB', 'PP', 'SP', 'DP'];
  idNumberPattern = `[1-6][0-9]{6}[ABCKEMH][0-9]{3}(PB|BA|BI)[0-9]`;
  cities = ['Minsk', 'Gomel', 'Grodno', 'Brest', 'Soligorsk', 'Mogilev', 'Vitebsk'];
  maritalStatuses = ['Single', 'Married', 'Widowed', 'Divorced', 'Separated'];
  nationalities = ['Republic of Belarus'];

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
    Validators.pattern(`[FM]`)
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
    Validators.minLength(2),
    Validators.maxLength(2),
    Validators.pattern(`AB|BM|HB|KH|MP|MC|KB|PP|SP|DP`)
  ]);
  passportNumberControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(7),
    Validators.pattern(`[0-9]{7}`)
  ]);
  issuedByControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern(`.*[a-zA-Z].*`)
  ]);
  dateOfIssueControl = this.fb.control('', [
    Validators.required
  ]);
  idNumberControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
    Validators.pattern(this.idNumberPattern)]
  );
  placeOfBirthControl = this.fb.control('', [
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



  actualResidenceCityControl = this.fb.control('Minsk', [
    Validators.required,
  ]);
  actualResidenceAddressControl = this.fb.control('', [
    Validators.required
  ]);
  maritalStatusControl = this.fb.control('Single', [
    Validators.required
  ]);
  nationalityControl = this.fb.control('Republic of Belarus', [
    Validators.required
  ]);
  disabilityControl = this.fb.control('0', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(1),
    Validators.pattern('[0-3]')]
  );
  retiredControl = this.fb.control(false, [
    Validators.required
  ]);
  boundToMilitaryServiceControl = this.fb.control(false, [
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
      this.snackBar.open('Added!');
      this.newClientEvent.emit(client);
    }, (error) => {
      this.snackBar.open(error.message);
    });
  }

}
