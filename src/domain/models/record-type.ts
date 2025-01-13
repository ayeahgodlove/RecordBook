import { IBaseResponse } from "./base-response";

export interface IRecordType {
  id: string;
  name: string;
  description: string;
}

export const emptyRecordType: IRecordType = {
  id: "",
  name: "",
  description: "",
};

export interface IRecordTypeResponse extends IBaseResponse {
  data: IRecordType | null | IRecordType[];
}
