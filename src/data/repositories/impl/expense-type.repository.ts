import { ExpenseType } from "../../entities/expense-type";
import { IExpenseType } from "../../../domain/models/expense-type";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class ExpenseTypeRepository implements IRepository<IExpenseType, ExpenseType> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a ExpenseType as parameter
   * @expenseType
   * returns void
   */
  async create(expenseType: IExpenseType): Promise<ExpenseType> {
    try {
      return await ExpenseType.create<ExpenseType>({ ...expenseType });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns ExpenseType
   */
  async findById(id: string): Promise<ExpenseType | null> {
    try {
      const expenseTypeItem = await ExpenseType.findByPk(id);

      if (!expenseTypeItem) {
        throw new NotFoundException("ExpenseType", id);
      }
      return expenseTypeItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns ExpenseType
   */
  async findByName(name: string): Promise<ExpenseType | null> {
    try {
      const expenseTypeItem = await ExpenseType.findOne({ where: { name } });
      return expenseTypeItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of ExpenseType
   */
  async getAll(): Promise<ExpenseType[]> {
    try {
      const expenseTypes = await ExpenseType.findAll();
      return expenseTypes;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a ExpenseType as parameter
   * @expenseType
   * returns void
   */
  async update(expenseType: IExpenseType): Promise<ExpenseType> {
    const { id } = expenseType;
    try {
      const expenseTypeItem: any = await ExpenseType.findByPk(id);

      console.log(expenseType);
      if (!expenseTypeItem) {
        throw new NotFoundException("ExpenseType", id.toString());
      }

      return await expenseTypeItem.update({ ...expenseType });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const expenseTypeItem = await ExpenseType.findByPk(id);

      if (!expenseTypeItem) {
        throw new NotFoundException("ExpenseType", id);
      }

      await expenseTypeItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
