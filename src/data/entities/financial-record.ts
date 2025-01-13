import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { IFinancialRecord } from "../../domain/models/financial-record";
import { User } from "./user";
import { IncomeType } from "./income-type";
import { ExpenseType } from "./expense-type";
import { RecordType } from "./record-type";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "financial_record",
})
export class FinancialRecord extends Model<IFinancialRecord> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => IncomeType)
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  incomeTypeId!: string;

  @ForeignKey(() => ExpenseType)
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  expenseTypeId!: string;

  @ForeignKey(() => RecordType)
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  recordTypeId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  amount!: number;

  @ForeignKey(() => User)
  @Column
  createdBy!: string;

  @Column
  recordDate!: Date;

  @BelongsTo(() => User)
  user!: User;
}
