import { Request, Response } from "express";
import {
  IExpenseType,
  IExpenseTypeResponse,
  emptyExpenseType,
} from "../../domain/models/expense-type";
import { ExpenseTypeUseCase } from "../../domain/usecases/expense-type.usecase";
import { ExpenseTypeRepository } from "../../data/repositories/impl/expense-type.repository";
import { ExpenseTypeMapper } from "../mappers/mapper";
import { ExpenseTypeRequestDto } from "../dtos/expense-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const expenseTypeRepository = new ExpenseTypeRepository();
const expenseTypeUseCase = new ExpenseTypeUseCase(expenseTypeRepository);
const expenseTypeMapper = new ExpenseTypeMapper();

export class ExpenseTypesController {
  async createExpenseType(
    req: Request,
    res: Response<IExpenseTypeResponse>
  ): Promise<void> {
    const dto = new ExpenseTypeRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const expenseTypeResponse = await expenseTypeUseCase.createExpenseType(
          dto.toData()
        );

        res.status(201).json({
          data: expenseTypeResponse.toJSON<IExpenseType>(),
          message: "Expense Type created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const expenseTypes = await expenseTypeUseCase.getAll();
      const expenseTypesDTO = expenseTypeMapper.toDTOs(expenseTypes);

      res.json(expenseTypesDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getExpenseTypeById(
    req: Request,
    res: Response<IExpenseTypeResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const expenseType = await expenseTypeUseCase.getExpenseTypeById(id);
      if (!expenseType) {
        throw new NotFoundException("ExpenseType", id);
      }
      const expenseTypeDTO = expenseTypeMapper.toDTO(expenseType);
      res.json({
        data: expenseTypeDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateExpenseType(
    req: Request,
    res: Response<IExpenseTypeResponse>
  ): Promise<void> {
    const dto = new ExpenseTypeRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IExpenseType = {
          ...emptyExpenseType,
          ...req.body,
          id: id,
        };
        const updatedExpenseType = await expenseTypeUseCase.updateExpenseType(
          obj
        );
        const expenseTypeDto = expenseTypeMapper.toDTO(updatedExpenseType);

        res.json({
          data: expenseTypeDto,
          message: "ExpenseType Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteExpenseType(
    req: Request,
    res: Response<IExpenseTypeResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await expenseTypeUseCase.deleteExpenseType(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}
