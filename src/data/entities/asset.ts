import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { IAsset } from "../../domain/models/asset";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "asset",
})
export class Asset extends Model<IAsset> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  value!: number;

  @ForeignKey(() => User)
  @Column
  createdBy!: string;

  @Column
  acquireDate!: Date;

  @Column({
    type: DataType.ENUM("Available", "Assigned", "Decommissioned"),
    allowNull: false,
  })
  status!: string;

  @BelongsTo(() => User)
  user!: User;
}
