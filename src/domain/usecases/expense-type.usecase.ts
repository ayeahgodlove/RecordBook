import { ExpenseType } from "../../data/entities/expense-type";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IExpenseType } from "../models/expense-type";
export class ExpenseTypeUseCase {
  /**
   *
   */
  constructor(
    private readonly expenseTypeRepository: IRepository<IExpenseType, ExpenseType>
  ) {}

  async createExpenseType(expenseType: IExpenseType): Promise<ExpenseType> {
    const existingExpenseType = await this.expenseTypeRepository.findByName(
      expenseType.name
    );

    if (existingExpenseType) {
      throw new Error("ExpenseType already exists");
    }

    // const _expenseType = new ExpenseType({expenseType});
    //because it's already done in the Repository
    return this.expenseTypeRepository.create(expenseType);
  }

  async getAll(): Promise<ExpenseType[]> {
    return this.expenseTypeRepository.getAll();
  }

  async getExpenseTypeById(id: string): Promise<ExpenseType | null> {
    return this.expenseTypeRepository.findById(id);
  }

  async updateExpenseType(expenseType: IExpenseType): Promise<ExpenseType> {
    const { id, name, description } = expenseType;
    const obj: IExpenseType = {
      id,
      name,
      description,
    };
    return this.expenseTypeRepository.update(obj);
  }

  async deleteExpenseType(id: string): Promise<void> {
    return this.expenseTypeRepository.delete(id);
  }
}
