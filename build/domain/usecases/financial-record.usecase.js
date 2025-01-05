"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRecordUseCase = void 0;
class FinancialRecordUseCase {
    financialRecordRepository;
    /**
     *
     */
    constructor(financialRecordRepository) {
        this.financialRecordRepository = financialRecordRepository;
    }
    async createFinancialRecord(financialRecord) {
        //because it's already done in the Repository
        return this.financialRecordRepository.create(financialRecord);
    }
    async getAll() {
        return this.financialRecordRepository.getAll();
    }
    async getFinancialRecordById(id) {
        return this.financialRecordRepository.findById(id);
    }
    async updateFinancialRecord(financialRecord) {
        return this.financialRecordRepository.update(financialRecord);
    }
    async deleteFinancialRecord(id) {
        return this.financialRecordRepository.delete(id);
    }
}
exports.FinancialRecordUseCase = FinancialRecordUseCase;
