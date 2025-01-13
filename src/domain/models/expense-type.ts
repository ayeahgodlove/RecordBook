import { IBaseResponse } from "./base-response";

export interface IExpenseType {
  id: string;
  name: string;
  description: string;
}

export const emptyExpenseType: IExpenseType = {
  id: "",
  name: "",
  description: "",
};

export interface IExpenseTypeResponse extends IBaseResponse {
  data: IExpenseType | null | IExpenseType[];
}
