import { FinancialRecord } from "../../entities/financial-record";
import { IFinancialRecord } from "../../../domain/models/financial-record";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class FinancialRecordRepository implements IRepository<IFinancialRecord, FinancialRecord> {
  /**
   *
   */
  constructor() {}
  findByName(name: string): Promise<FinancialRecord | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Receives a FinancialRecord as parameter
   * @financialRecord
   * returns void
   */
  async create(financialRecord: IFinancialRecord): Promise<FinancialRecord> {
    try {
      return await FinancialRecord.create<FinancialRecord>({ ...financialRecord });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns FinancialRecord
   */
  async findById(id: string): Promise<FinancialRecord | null> {
    try {
      const financialRecordItem = await FinancialRecord.findByPk(id);

      if (!financialRecordItem) {
        throw new NotFoundException("FinancialRecord", id);
      }
      return financialRecordItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of FinancialRecord
   */
  async getAll(): Promise<FinancialRecord[]> {
    try {
      const categories = await FinancialRecord.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a FinancialRecord as parameter
   * @financialRecord
   * returns void
   */
  async update(financialRecord: IFinancialRecord): Promise<FinancialRecord> {
    const { id } = financialRecord;
    try {
      const financialRecordItem: any = await FinancialRecord.findByPk(id);

      console.log(financialRecord);
      if (!financialRecordItem) {
        throw new NotFoundException("FinancialRecord", id.toString());
      }

      return await financialRecordItem.update({ ...financialRecord });
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
      const financialRecordItem = await FinancialRecord.findByPk(id);

      if (!financialRecordItem) {
        throw new NotFoundException("FinancialRecord", id);
      }

      await financialRecordItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
