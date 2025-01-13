import { Request, Response } from "express";
import {
  IIncomeType,
  IIncomeTypeResponse,
  emptyIncomeType,
} from "../../domain/models/income-type";
import { IncomeTypeUseCase } from "../../domain/usecases/income-type.usecase";
import { IncomeTypeRepository } from "../../data/repositories/impl/income-type.repository";
import { IncomeTypeMapper } from "../mappers/mapper";
import { IncomeTypeRequestDto } from "../dtos/income-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const incomeTypeRepository = new IncomeTypeRepository();
const incomeTypeUseCase = new IncomeTypeUseCase(incomeTypeRepository);
const incomeTypeMapper = new IncomeTypeMapper();

export class IncomeTypesController {
  async createIncomeType(
    req: Request,
    res: Response<IIncomeTypeResponse>
  ): Promise<void> {
    const dto = new IncomeTypeRequestDto(req.body);
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
        const incomeTypeResponse = await incomeTypeUseCase.createIncomeType(
          dto.toData()
        );

        res.status(201).json({
          data: incomeTypeResponse.toJSON<IIncomeType>(),
          message: "Income Type created Successfully!",
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
      const incomeTypes = await incomeTypeUseCase.getAll();
      const incomeTypesDTO = incomeTypeMapper.toDTOs(incomeTypes);

      res.json(incomeTypesDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getIncomeTypeById(
    req: Request,
    res: Response<IIncomeTypeResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const incomeType = await incomeTypeUseCase.getIncomeTypeById(id);
      if (!incomeType) {
        throw new NotFoundException("IncomeType", id);
      }
      const incomeTypeDTO = incomeTypeMapper.toDTO(incomeType);
      res.json({
        data: incomeTypeDTO,
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

  async updateIncomeType(
    req: Request,
    res: Response<IIncomeTypeResponse>
  ): Promise<void> {
    const dto = new IncomeTypeRequestDto(req.body);
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

        const obj: IIncomeType = {
          ...emptyIncomeType,
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

  async deleteIncomeType(
    req: Request,
    res: Response<IIncomeTypeResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await incomeTypeUseCase.deleteIncomeType(id);

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
