"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeTypeUseCase = void 0;
class IncomeTypeUseCase {
    incomeTypeRepository;
    /**
     *
     */
    constructor(incomeTypeRepository) {
        this.incomeTypeRepository = incomeTypeRepository;
    }
    async createIncomeType(incomeType) {
        const existingIncomeType = await this.incomeTypeRepository.findByName(incomeType.name);
        if (existingIncomeType) {
            throw new Error("IncomeType already exists");
        }
        // const _incomeType = new IncomeType({incomeType});
        //because it's already done in the Repository
        return this.incomeTypeRepository.create(incomeType);
    }
    async getAll() {
        return this.incomeTypeRepository.getAll();
    }
    async getIncomeTypeById(id) {
        return this.incomeTypeRepository.findById(id);
    }
    async updateIncomeType(incomeType) {
        const { id, name, description } = incomeType;
        const obj = {
            id,
            name,
            description,
        };
        return this.incomeTypeRepository.update(obj);
    }
    async deleteIncomeType(id) {
        return this.incomeTypeRepository.delete(id);
    }
}
exports.IncomeTypeUseCase = IncomeTypeUseCase;
