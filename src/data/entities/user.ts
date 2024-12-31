import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { IUser } from "../../domain/models/user";
import { Role } from "./role";
import { UserRole } from "./user-role";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "user",
})
export class User extends Model<IUser> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  authStrategy!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: true,
  })
  fullname!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  avatar!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(13),
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  city!: string; 

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  country!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
  })
  password!: string;

  // verification paramters
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified!: boolean;


  // Define the many-to-many association with Role
  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];

}
