"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseTypesController = void 0;
const expense_type_1 = require("../../domain/models/expense-type");
const expense_type_usecase_1 = require("../../domain/usecases/expense-type.usecase");
const expense_type_repository_1 = require("../../data/repositories/impl/expense-type.repository");
const mapper_1 = require("../mappers/mapper");
const expense_request_dto_1 = require("../dtos/expense-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const expenseTypeRepository = new expense_type_repository_1.ExpenseTypeRepository();
const expenseTypeUseCase = new expense_type_usecase_1.ExpenseTypeUseCase(expenseTypeRepository);
const expenseTypeMapper = new mapper_1.ExpenseTypeMapper();
class ExpenseTypesController {
    async createExpenseType(req, res) {
        const dto = new expense_request_dto_1.ExpenseTypeRequestDto(req.body);
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
                const expenseTypeResponse = await expenseTypeUseCase.createExpenseType(dto.toData());
                res.status(201).json({
                    data: expenseTypeResponse.toJSON(),
                    message: "Expense Type created Successfully!",
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
            const expenseTypes = await expenseTypeUseCase.getAll();
            const expenseTypesDTO = expenseTypeMapper.toDTOs(expenseTypes);
            res.json(expenseTypesDTO);
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
    async getExpenseTypeById(req, res) {
        try {
            const id = req.params.id;
            const expenseType = await expenseTypeUseCase.getExpenseTypeById(id);
            if (!expenseType) {
                throw new not_found_exception_1.NotFoundException("ExpenseType", id);
            }
            const expenseTypeDTO = expenseTypeMapper.toDTO(expenseType);
            res.json({
                data: expenseTypeDTO,
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
    async updateExpenseType(req, res) {
        const dto = new expense_request_dto_1.ExpenseTypeRequestDto(req.body);
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
                    ...expense_type_1.emptyExpenseType,
                    ...req.body,
                    id: id,
                };
                const updatedExpenseType = await expenseTypeUseCase.updateExpenseType(obj);
                const expenseTypeDto = expenseTypeMapper.toDTO(updatedExpenseType);
                res.json({
                    data: expenseTypeDto,
                    message: "ExpenseType Updated Successfully!",
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
    async deleteExpenseType(req, res) {
        try {
            const id = req.params.id;
            await expenseTypeUseCase.deleteExpenseType(id);
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
exports.ExpenseTypesController = ExpenseTypesController;
