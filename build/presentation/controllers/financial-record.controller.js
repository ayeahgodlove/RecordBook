"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialRecordsController = void 0;
const financial_record_1 = require("../../domain/models/financial-record");
const financial_record_usecase_1 = require("../../domain/usecases/financial-record.usecase");
const financial_record_repository_1 = require("../../data/repositories/impl/financial-record.repository");
const mapper_1 = require("../mappers/mapper");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const financial_record_request_dto_1 = require("../dtos/financial-record-request.dto");
const financialRecordRepository = new financial_record_repository_1.FinancialRecordRepository();
const financialRecordUseCase = new financial_record_usecase_1.FinancialRecordUseCase(financialRecordRepository);
const financialRecordMapper = new mapper_1.FinancialRecordMapper();
class FinancialRecordsController {
    async createFinancialRecord(req, res) {
        const dto = new financial_record_request_dto_1.FinancialRecordRequestDto(req.body);
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
                const financialRecordResponse = await financialRecordUseCase.createFinancialRecord(dto.toData());
                res.status(201).json({
                    data: financialRecordResponse.toJSON(),
                    message: "FinancialRecord created Successfully!",
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
            const financialRecordes = await financialRecordUseCase.getAll();
            const financialRecordesDTO = financialRecordMapper.toDTOs(financialRecordes);
            res.json(financialRecordesDTO);
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
    async getFinancialRecordById(req, res) {
        try {
            const id = req.params.id;
            const financialRecord = await financialRecordUseCase.getFinancialRecordById(id);
            if (!financialRecord) {
                throw new not_found_exception_1.NotFoundException("FinancialRecord", id);
            }
            const financialRecordDTO = financialRecordMapper.toDTO(financialRecord);
            res.json({
                data: financialRecordDTO,
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
    async updateFinancialRecord(req, res) {
        const dto = new financial_record_request_dto_1.FinancialRecordRequestDto(req.body);
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
                    ...financial_record_1.emptyFinancialRecord,
                    ...req.body,
                    id: id,
                };
                const updatedFinancialRecord = await financialRecordUseCase.updateFinancialRecord(obj);
                const financialRecordDto = financialRecordMapper.toDTO(updatedFinancialRecord);
                res.json({
                    data: financialRecordDto,
                    message: "FinancialRecord Updated Successfully!",
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
    async deleteFinancialRecord(req, res) {
        try {
            const id = req.params.id;
            await financialRecordUseCase.deleteFinancialRecord(id);
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
exports.FinancialRecordsController = FinancialRecordsController;
