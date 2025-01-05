import { IBaseResponse } from "./base-response";

export interface ICategory {
  id: string;
  name: string;
}

export const emptyCategory: ICategory = {
  id: "",
  name: "",
};

export interface ICategoryResponse extends IBaseResponse {
  data: ICategory | null | ICategory[];
}
