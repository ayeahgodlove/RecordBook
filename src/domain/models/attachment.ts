import { IBaseResponse } from "./base-response";

export interface IAttachment {
  id: string;
  filePath: string;
  fileType: string;
  relatedTo: string; //meeting-minute, financial record, asset
  uploadedBy: string;
}

export const emptyAttachment: IAttachment = {
  id: "",
  filePath: "",
  fileType: "",
  relatedTo: "",
  uploadedBy: "",
};

export interface IAttachmentResponse extends IBaseResponse {
  data: IAttachment | null | IAttachment[];
}
