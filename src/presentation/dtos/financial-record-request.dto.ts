// src/presentation/dtos/financialRecord-request.dto.ts

import { IsNotEmpty, IsString } from "class-validator";
import {
  IFinancialRecord,
  emptyFinancialRecord,
} from "../../domain/models/financial-record";
import { nanoid } from "nanoid";

export class FinancialRecordRequestDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  recordDate: Date;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  createdBy: string;

  constructor(data: IFinancialRecord) {
    this.description = data.description;
    this.recordDate = data.recordDate;
    this.amount = data.amount;
    this.createdBy = data.createdBy;
  }

  toData(): IFinancialRecord {
    return {
      ...emptyFinancialRecord,
      id: nanoid(10),
      description: this.description,
      createdBy: this.createdBy,
      amount: this.amount,
      recordDate: this.recordDate,
    };
  }

  toUpdateData(data: IFinancialRecord): IFinancialRecord {
    return {
      id: data.id,
      description: data.description,
      createdBy: data.createdBy,
      amount: data.amount,
      recordDate: data.recordDate,
      incomeTypeId: data.incomeTypeId,
      expenseTypeId: data.expenseTypeId,
      recordTypeId: data.recordTypeId,
    };
  }
}
