"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeTypeRepository = void 0;
const income_type_1 = require("../../entities/income-type");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class IncomeTypeRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a IncomeType as parameter
     * @incomeType
     * returns void
     */
    async create(incomeType) {
        try {
            return await income_type_1.IncomeType.create({ ...incomeType });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns IncomeType
     */
    async findById(id) {
        try {
            const incomeTypeItem = await income_type_1.IncomeType.findByPk(id);
            if (!incomeTypeItem) {
                throw new not_found_exception_1.NotFoundException("IncomeType", id);
            }
            return incomeTypeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns IncomeType
     */
    async findByName(name) {
        try {
            const incomeTypeItem = await income_type_1.IncomeType.findOne({ where: { name } });
            return incomeTypeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of IncomeType
     */
    async getAll() {
        try {
            const incomeTypes = await income_type_1.IncomeType.findAll();
            return incomeTypes;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a IncomeType as parameter
     * @incomeType
     * returns void
     */
    async update(incomeType) {
        const { id } = incomeType;
        try {
            const incomeTypeItem = await income_type_1.IncomeType.findByPk(id);
            console.log(incomeType);
            if (!incomeTypeItem) {
                throw new not_found_exception_1.NotFoundException("IncomeType", id.toString());
            }
            return await incomeTypeItem.update({ ...incomeType });
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
            const incomeTypeItem = await income_type_1.IncomeType.findByPk(id);
            if (!incomeTypeItem) {
                throw new not_found_exception_1.NotFoundException("IncomeType", id);
            }
            await incomeTypeItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.IncomeTypeRepository = IncomeTypeRepository;
