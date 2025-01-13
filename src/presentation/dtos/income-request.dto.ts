// src/presentation/dtos/incomeType-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IIncomeType, emptyIncomeType } from "../../domain/models/income-type";
import { nanoid } from "nanoid";

export class IncomeTypeRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(data: IIncomeType) {
    this.name = data.name;
    this.description = data.description;
  }

  toData(): IIncomeType {
    return {
      ...emptyIncomeType,
      id: nanoid(10),
      name: this.name,
      description: this.description,
    };
  }

  toUpdateData(data: IIncomeType): IIncomeType {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }
}
