"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTypeRepository = void 0;
const record_type_1 = require("../../entities/record-type");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class RecordTypeRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a RecordType as parameter
     * @recordType
     * returns void
     */
    async create(recordType) {
        try {
            return await record_type_1.RecordType.create({ ...recordType });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns RecordType
     */
    async findById(id) {
        try {
            const recordTypeItem = await record_type_1.RecordType.findByPk(id);
            if (!recordTypeItem) {
                throw new not_found_exception_1.NotFoundException("RecordType", id);
            }
            return recordTypeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns RecordType
     */
    async findByName(name) {
        try {
            const recordTypeItem = await record_type_1.RecordType.findOne({ where: { name } });
            return recordTypeItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of RecordType
     */
    async getAll() {
        try {
            const recordTypes = await record_type_1.RecordType.findAll();
            return recordTypes;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a RecordType as parameter
     * @recordType
     * returns void
     */
    async update(recordType) {
        const { id } = recordType;
        try {
            const recordTypeItem = await record_type_1.RecordType.findByPk(id);
            console.log(recordType);
            if (!recordTypeItem) {
                throw new not_found_exception_1.NotFoundException("RecordType", id.toString());
            }
            return await recordTypeItem.update({ ...recordType });
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
            const recordTypeItem = await record_type_1.RecordType.findByPk(id);
            if (!recordTypeItem) {
                throw new not_found_exception_1.NotFoundException("RecordType", id);
            }
            await recordTypeItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.RecordTypeRepository = RecordTypeRepository;
