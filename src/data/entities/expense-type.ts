import { Table, Model, Column, DataType } from "sequelize-typescript";
import { IExpenseType } from "../../domain/models/expense-type";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "expense_type",
})
export class ExpenseType extends Model<IExpenseType> {
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
