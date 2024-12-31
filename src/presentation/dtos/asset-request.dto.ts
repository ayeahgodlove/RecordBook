// src/presentation/dtos/asset-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IAsset, emptyAsset } from "../../domain/models/asset";
import { nanoid } from "nanoid";

export class AssetRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  acquireDate: Date;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  createdBy: string;

  constructor(data: IAsset) {
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.acquireDate = data.acquireDate;
    this.value = data.value;
    this.createdBy = data.createdBy;
  }

  toData(): IAsset {
    return {
      ...emptyAsset,
      id: nanoid(10),
      name: this.name,
      description: this.description,
      acquireDate: this.acquireDate,
      createdBy: this.createdBy,
      status: this.status,
      value: this.value,
    };
  }

  toUpdateData(data: IAsset): IAsset {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      status: data.status,
      acquireDate: data.acquireDate,
      createdBy: data.createdBy,
      value: data.value,
    };
  }
}
