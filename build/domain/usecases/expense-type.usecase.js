"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseTypeUseCase = void 0;
class ExpenseTypeUseCase {
    expenseTypeRepository;
    /**
     *
     */
    constructor(expenseTypeRepository) {
        this.expenseTypeRepository = expenseTypeRepository;
    }
    async createExpenseType(expenseType) {
        const existingExpenseType = await this.expenseTypeRepository.findByName(expenseType.name);
        if (existingExpenseType) {
            throw new Error("ExpenseType already exists");
        }
        // const _expenseType = new ExpenseType({expenseType});
        //because it's already done in the Repository
        return this.expenseTypeRepository.create(expenseType);
    }
    async getAll() {
        return this.expenseTypeRepository.getAll();
    }
    async getExpenseTypeById(id) {
        return this.expenseTypeRepository.findById(id);
    }
    async updateExpenseType(expenseType) {
        const { id, name, description } = expenseType;
        const obj = {
            id,
            name,
            description,
        };
        return this.expenseTypeRepository.update(obj);
    }
    async deleteExpenseType(id) {
        return this.expenseTypeRepository.delete(id);
    }
}
exports.ExpenseTypeUseCase = ExpenseTypeUseCase;
