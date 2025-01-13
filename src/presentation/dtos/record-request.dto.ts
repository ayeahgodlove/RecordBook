// src/presentation/dtos/recordType-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IRecordType, emptyRecordType } from "../../domain/models/record-type";
import { nanoid } from "nanoid";

export class RecordTypeRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(data: IRecordType) {
    this.name = data.name;
    this.description = data.description;
  }

  toData(): IRecordType {
    return {
      ...emptyRecordType,
      id: nanoid(10),
      name: this.name,
      description: this.description,
    };
  }

  toUpdateData(data: IRecordType): IRecordType {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }
}
