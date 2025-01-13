// src/presentation/dtos/expenseType-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IExpenseType, emptyExpenseType } from "../../domain/models/expense-type";
import { nanoid } from "nanoid";

export class ExpenseTypeRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(data: IExpenseType) {
    this.name = data.name;
    this.description = data.description;
  }

  toData(): IExpenseType {
    return {
      ...emptyExpenseType,
      id: nanoid(10),
      name: this.name,
      description: this.description,
    };
  }

  toUpdateData(data: IExpenseType): IExpenseType {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }
}
