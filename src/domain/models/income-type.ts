import { IBaseResponse } from "./base-response";

export interface IIncomeType {
  id: string;
  name: string;
  description: string;
}

export const emptyIncomeType: IIncomeType = {
  id: "",
  name: "",
  description: "",
};

export interface IIncomeTypeResponse extends IBaseResponse {
  data: IIncomeType | null | IIncomeType[];
}
