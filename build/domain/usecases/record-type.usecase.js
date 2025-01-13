"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTypeUseCase = void 0;
class RecordTypeUseCase {
    recordTypeRepository;
    /**
     *
     */
    constructor(recordTypeRepository) {
        this.recordTypeRepository = recordTypeRepository;
    }
    async createRecordType(recordType) {
        const existingRecordType = await this.recordTypeRepository.findByName(recordType.name);
        if (existingRecordType) {
            throw new Error("RecordType already exists");
        }
        // const _recordType = new RecordType({recordType});
        //because it's already done in the Repository
        return this.recordTypeRepository.create(recordType);
    }
    async getAll() {
        return this.recordTypeRepository.getAll();
    }
    async getRecordTypeById(id) {
        return this.recordTypeRepository.findById(id);
    }
    async updateRecordType(recordType) {
        const { id, name, description } = recordType;
        const obj = {
            id,
            name,
            description,
        };
        return this.recordTypeRepository.update(obj);
    }
    async deleteRecordType(id) {
        return this.recordTypeRepository.delete(id);
    }
}
exports.RecordTypeUseCase = RecordTypeUseCase;
