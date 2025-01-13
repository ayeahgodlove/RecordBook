import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IRecordType } from "../../domain/models/record-type";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "record_type",
})
export class RecordType extends Model<IRecordType> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name!: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;
}
