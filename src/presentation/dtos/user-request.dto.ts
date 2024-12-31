// src/presentation/dtos/user-request.dto.ts

import { IsNotEmpty, IsString, Length, Max, Min } from "class-validator";
import { IUser, emptyUser } from "../../domain/models/user";
import { nanoid } from "nanoid";
export class UserRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  username: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: string;

  constructor(data: IUser) {
    this.username = data.username;
    this.fullname = data.fullname;
    this.username = data.username;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.password = data.password;
  }

  toData(): IUser {
    return {
      ...emptyUser,
      id: nanoid(15),
      username: this.username,
      fullname: this.fullname,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
    };
  }

  toUpdateData(data: IUser): IUser {
    return {
      id: data.id,
      username: data.username,
      fullname: data.fullname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      address: data.address,
      city: data.city,
      country: data.country,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      authStrategy: data.authStrategy,
      avatar: data.avatar,
      verified: data.verified
    };
  }
}
