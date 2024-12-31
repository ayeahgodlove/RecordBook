// src/presentation/dtos/attachment-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IAttachment, emptyAttachment } from "../../domain/models/attachment";
import { nanoid } from "nanoid";


export class AttachmentRequestDto {
  @IsNotEmpty()
  @IsString()
  filePath: string;

  @IsNotEmpty()
  @IsString()
  fileType: string;

  @IsNotEmpty()
  @IsString()
  relatedTo: string;

  @IsNotEmpty()
  uploadedBy: string;

  constructor(data: IAttachment) {
    this.filePath = data.filePath;
    this.fileType = data.fileType;
    this.relatedTo = data.relatedTo;
    this.uploadedBy = data.uploadedBy;
  }

  toData(): IAttachment {
    return {
      ...emptyAttachment,
      id: nanoid(10),
      filePath: this.filePath,
      fileType: this.fileType,
      relatedTo: this.relatedTo,
      uploadedBy: this.uploadedBy,
    };
  }

  toUpdateData(data: IAttachment): IAttachment {
    return {
      id: data.id,
      filePath: data.filePath,
      fileType: data.fileType,
      relatedTo: data.relatedTo,
      uploadedBy: data.uploadedBy,
    };
  }
}
