import { IncomeType } from "../../entities/income-type";
import { IIncomeType } from "../../../domain/models/income-type";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class IncomeTypeRepository implements IRepository<IIncomeType, IncomeType> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a IncomeType as parameter
   * @incomeType
   * returns void
   */
  async create(incomeType: IIncomeType): Promise<IncomeType> {
    try {
      return await IncomeType.create<IncomeType>({ ...incomeType });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns IncomeType
   */
  async findById(id: string): Promise<IncomeType | null> {
    try {
      const incomeTypeItem = await IncomeType.findByPk(id);

      if (!incomeTypeItem) {
        throw new NotFoundException("IncomeType", id);
      }
      return incomeTypeItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns IncomeType
   */
  async findByName(name: string): Promise<IncomeType | null> {
    try {
      const incomeTypeItem = await IncomeType.findOne({ where: { name } });
      return incomeTypeItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of IncomeType
   */
  async getAll(): Promise<IncomeType[]> {
    try {
      const incomeTypes = await IncomeType.findAll();
      return incomeTypes;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a IncomeType as parameter
   * @incomeType
   * returns void
   */
  async update(incomeType: IIncomeType): Promise<IncomeType> {
    const { id } = incomeType;
    try {
      const incomeTypeItem: any = await IncomeType.findByPk(id);

      console.log(incomeType);
      if (!incomeTypeItem) {
        throw new NotFoundException("IncomeType", id.toString());
      }

      return await incomeTypeItem.update({ ...incomeType });
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
      const incomeTypeItem = await IncomeType.findByPk(id);

      if (!incomeTypeItem) {
        throw new NotFoundException("IncomeType", id);
      }

      await incomeTypeItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
