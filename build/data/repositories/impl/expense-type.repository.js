"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseTypeRepository = void 0;
const expense_type_1 = require("../../entities/expense-type");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class ExpenseTypeRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a ExpenseType as parameter
     * @expenseType
     * returns void
     */
    async create(expenseType) {
        try {
            return await expense_type_1.ExpenseType.create({ ...expenseType });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns ExpenseType
     */
    async findById(id) {
        try {
            const expenseTypeItem = await expense_type_1.ExpenseType.findByPk(id);
            if (!expenseTypeItem) {
                throw new not_found_exception_1.NotFoundException("ExpenseType", id);
            }
            return expenseTypeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns ExpenseType
     */
    async findByName(name) {
        try {
            const expenseTypeItem = await expense_type_1.ExpenseType.findOne({ where: { name } });
            return expenseTypeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of ExpenseType
     */
    async getAll() {
        try {
            const expenseTypes = await expense_type_1.ExpenseType.findAll();
            return expenseTypes;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a ExpenseType as parameter
     * @expenseType
     * returns void
     */
    async update(expenseType) {
        const { id } = expenseType;
        try {
            const expenseTypeItem = await expense_type_1.ExpenseType.findByPk(id);
            console.log(expenseType);
            if (!expenseTypeItem) {
                throw new not_found_exception_1.NotFoundException("ExpenseType", id.toString());
            }
            return await expenseTypeItem.update({ ...expenseType });
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
            const expenseTypeItem = await expense_type_1.ExpenseType.findByPk(id);
            if (!expenseTypeItem) {
                throw new not_found_exception_1.NotFoundException("ExpenseType", id);
            }
            await expenseTypeItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ExpenseTypeRepository = ExpenseTypeRepository;
