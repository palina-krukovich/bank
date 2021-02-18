export interface BankProgram {
  id?: number;
  name: string;
  type: string;
  payType: string;
  currency: string;
  percentRate: number;
  minPeriod?: number;
  maxPeriod?: number;
  minAmount?: number;
  maxAmount?: number;
}
