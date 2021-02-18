export interface Client {
  id?: number;
  surname: string;
  name: string;
  middleName: string;
  birthDate: string;
  gender: string;
  passportSeries: string;
  passportNumber: string;
  issuedBy: string;
  dateOfIssue: string;
  idNumber: string;
  placeOfBirth: string;
  city: string;
  address: string;
  homeNumber?: string;
  mobileNumber?: string;
  email?: string;
  maritalStatus: string;
  citizenship: string;
  disability: number;
  retired: boolean;
  monthlyIncome?: number;
  boundToMilitaryService: boolean;
}
