// src/presentation/dtos/financialRecord-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IFinancialRecord, emptyFinancialRecord } from "../../domain/models/financial-record";
import { nanoid } from "nanoid";


export class FinancialRecordRequestDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  recordDate: Date;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  createdBy: string;

  constructor(data: IFinancialRecord) {
    this.type = data.type;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.recordDate = data.recordDate;
    this.amount = data.amount;
    this.createdBy = data.createdBy;
  }

  toData(): IFinancialRecord {
    return {
      ...emptyFinancialRecord,
      id: nanoid(10),
      type: this.type,
      description: this.description,
      categoryId: this.categoryId,
      createdBy: this.createdBy,
      amount: this.amount,
      recordDate: this.recordDate,
    };
  }

  toUpdateData(data: IFinancialRecord): IFinancialRecord {
    return {
      id: data.id,
      type: data.type,
      description: data.description,
      categoryId: data.categoryId,
      createdBy: data.createdBy,
      amount: data.amount,
      recordDate: data.recordDate,
    };
  }
}
