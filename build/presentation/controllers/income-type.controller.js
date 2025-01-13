"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeTypesController = void 0;
const income_type_1 = require("../../domain/models/income-type");
const income_type_usecase_1 = require("../../domain/usecases/income-type.usecase");
const income_type_repository_1 = require("../../data/repositories/impl/income-type.repository");
const mapper_1 = require("../mappers/mapper");
const income_request_dto_1 = require("../dtos/income-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const incomeTypeRepository = new income_type_repository_1.IncomeTypeRepository();
const incomeTypeUseCase = new income_type_usecase_1.IncomeTypeUseCase(incomeTypeRepository);
const incomeTypeMapper = new mapper_1.IncomeTypeMapper();
class IncomeTypesController {
    async createIncomeType(req, res) {
        const dto = new income_request_dto_1.IncomeTypeRequestDto(req.body);
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
                const incomeTypeResponse = await incomeTypeUseCase.createIncomeType(dto.toData());
                res.status(201).json({
                    data: incomeTypeResponse.toJSON(),
                    message: "Income Type created Successfully!",
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
            const incomeTypes = await incomeTypeUseCase.getAll();
            const incomeTypesDTO = incomeTypeMapper.toDTOs(incomeTypes);
            res.json(incomeTypesDTO);
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
    async getIncomeTypeById(req, res) {
        try {
            const id = req.params.id;
            const incomeType = await incomeTypeUseCase.getIncomeTypeById(id);
            if (!incomeType) {
                throw new not_found_exception_1.NotFoundException("IncomeType", id);
            }
            const incomeTypeDTO = incomeTypeMapper.toDTO(incomeType);
            res.json({
                data: incomeTypeDTO,
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
    async updateIncomeType(req, res) {
        const dto = new income_request_dto_1.IncomeTypeRequestDto(req.body);
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
                    ...income_type_1.emptyIncomeType,
                    ...req.body,
                    id: id,
                };
                const updatedIncomeType = await incomeTypeUseCase.updateIncomeType(obj);
                const incomeTypeDto = incomeTypeMapper.toDTO(updatedIncomeType);
                res.json({
                    data: incomeTypeDto,
                    message: "IncomeType Updated Successfully!",
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
    async deleteIncomeType(req, res) {
        try {
            const id = req.params.id;
            await incomeTypeUseCase.deleteIncomeType(id);
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
exports.IncomeTypesController = IncomeTypesController;
