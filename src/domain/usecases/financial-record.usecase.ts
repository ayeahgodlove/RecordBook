import { FinancialRecord } from "../../data/entities/financial-record";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IFinancialRecord } from "../models/financial-record";
export class FinancialRecordUseCase {
  /**
   *
   */
  constructor(
    private readonly financialRecordRepository: IRepository<IFinancialRecord, FinancialRecord>
  ) {}

  async createFinancialRecord(financialRecord: IFinancialRecord): Promise<FinancialRecord> {
    //because it's already done in the Repository
    return this.financialRecordRepository.create(financialRecord);
  }

  async getAll(): Promise<FinancialRecord[]> {
    return this.financialRecordRepository.getAll();
  }

  async getFinancialRecordById(id: string): Promise<FinancialRecord | null> {
    return this.financialRecordRepository.findById(id);
  }

  async updateFinancialRecord(financialRecord: IFinancialRecord): Promise<FinancialRecord> {
    return this.financialRecordRepository.update(financialRecord);
  }

  async deleteFinancialRecord(id: string): Promise<void> {
    return this.financialRecordRepository.delete(id);
  }
}
