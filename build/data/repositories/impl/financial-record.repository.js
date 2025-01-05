"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRecordRepository = void 0;
const financial_record_1 = require("../../entities/financial-record");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class FinancialRecordRepository {
    /**
     *
     */
    constructor() { }
    findByName(name) {
        throw new Error("Method not implemented.");
    }
    /**
     * Receives a FinancialRecord as parameter
     * @financialRecord
     * returns void
     */
    async create(financialRecord) {
        try {
            return await financial_record_1.FinancialRecord.create({ ...financialRecord });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns FinancialRecord
     */
    async findById(id) {
        try {
            const financialRecordItem = await financial_record_1.FinancialRecord.findByPk(id);
            if (!financialRecordItem) {
                throw new not_found_exception_1.NotFoundException("FinancialRecord", id);
            }
            return financialRecordItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of FinancialRecord
     */
    async getAll() {
        try {
            const categories = await financial_record_1.FinancialRecord.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a FinancialRecord as parameter
     * @financialRecord
     * returns void
     */
    async update(financialRecord) {
        const { id } = financialRecord;
        try {
            const financialRecordItem = await financial_record_1.FinancialRecord.findByPk(id);
            console.log(financialRecord);
            if (!financialRecordItem) {
                throw new not_found_exception_1.NotFoundException("FinancialRecord", id.toString());
            }
            return await financialRecordItem.update({ ...financialRecord });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const financialRecordItem = await financial_record_1.FinancialRecord.findByPk(id);
            if (!financialRecordItem) {
                throw new not_found_exception_1.NotFoundException("FinancialRecord", id);
            }
            await financialRecordItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.FinancialRecordRepository = FinancialRecordRepository;
