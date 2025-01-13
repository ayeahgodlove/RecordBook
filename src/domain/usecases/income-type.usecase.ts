import { IncomeType } from "../../data/entities/income-type";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IIncomeType } from "../models/income-type";
export class IncomeTypeUseCase {
  /**
   *
   */
  constructor(
    private readonly incomeTypeRepository: IRepository<IIncomeType, IncomeType>
  ) {}

  async createIncomeType(incomeType: IIncomeType): Promise<IncomeType> {
    const existingIncomeType = await this.incomeTypeRepository.findByName(
      incomeType.name
    );

    if (existingIncomeType) {
      throw new Error("IncomeType already exists");
    }

    // const _incomeType = new IncomeType({incomeType});
    //because it's already done in the Repository
    return this.incomeTypeRepository.create(incomeType);
  }

  async getAll(): Promise<IncomeType[]> {
    return this.incomeTypeRepository.getAll();
  }

  async getIncomeTypeById(id: string): Promise<IncomeType | null> {
    return this.incomeTypeRepository.findById(id);
  }

  async updateIncomeType(incomeType: IIncomeType): Promise<IncomeType> {
    const { id, name, description } = incomeType;
    const obj: IIncomeType = {
      id,
      name,
      description,
    };
    return this.incomeTypeRepository.update(obj);
  }

  async deleteIncomeType(id: string): Promise<void> {
    return this.incomeTypeRepository.delete(id);
  }
}
