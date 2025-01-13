import { IBaseResponse } from "./base-response";

export interface IFinancialRecord {
  id: string;
  incomeTypeId: string;
  expenseTypeId: string;
  recordTypeId: string;
  amount: number;
  description: string;
  recordDate: Date;
  createdBy: string;
}

export const emptyFinancialRecord: IFinancialRecord = {
  id: "",
  amount: 0,
  description: "",
  recordDate: new Date(),
  createdBy: "",
  incomeTypeId: "",
  expenseTypeId: "",
  recordTypeId: "",
};

export interface IFinancialRecordResponse extends IBaseResponse {
  data: IFinancialRecord | null | IFinancialRecord[];
}
