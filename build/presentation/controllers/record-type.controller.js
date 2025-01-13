"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTypesController = void 0;
const record_type_1 = require("../../domain/models/record-type");
const record_type_usecase_1 = require("../../domain/usecases/record-type.usecase");
const record_type_repository_1 = require("../../data/repositories/impl/record-type.repository");
const mapper_1 = require("../mappers/mapper");
const record_request_dto_1 = require("../dtos/record-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const recordTypeRepository = new record_type_repository_1.RecordTypeRepository();
const recordTypeUseCase = new record_type_usecase_1.RecordTypeUseCase(recordTypeRepository);
const recordTypeMapper = new mapper_1.RecordTypeMapper();
class RecordTypesController {
    async createRecordType(req, res) {
        const dto = new record_request_dto_1.RecordTypeRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const recordTypeResponse = await recordTypeUseCase.createRecordType(dto.toData());
                res.status(201).json({
                    data: recordTypeResponse.toJSON(),
                    message: "Record Type created Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [],
                    success: false,
                });
            }
        }
    }
    async getAll(req, res) {
        try {
            const recordTypes = await recordTypeUseCase.getAll();
            const recordTypesDTO = recordTypeMapper.toDTOs(recordTypes);
            res.json(recordTypesDTO);
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getRecordTypeById(req, res) {
        try {
            const id = req.params.id;
            const recordType = await recordTypeUseCase.getRecordTypeById(id);
            if (!recordType) {
                throw new not_found_exception_1.NotFoundException("RecordType", id);
            }
            const recordTypeDTO = recordTypeMapper.toDTO(recordType);
            res.json({
                data: recordTypeDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async updateRecordType(req, res) {
        const dto = new record_request_dto_1.RecordTypeRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...record_type_1.emptyRecordType,
                    ...req.body,
                    id: id,
                };
                const updatedRecordType = await recordTypeUseCase.updateRecordType(obj);
                const recordTypeDto = recordTypeMapper.toDTO(updatedRecordType);
                res.json({
                    data: recordTypeDto,
                    message: "RecordType Updated Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [error],
                    success: false,
                });
            }
        }
    }
    async deleteRecordType(req, res) {
        try {
            const id = req.params.id;
            await recordTypeUseCase.deleteRecordType(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: true,
            });
        }
    }
}
exports.RecordTypesController = RecordTypesController;
