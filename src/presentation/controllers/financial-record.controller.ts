import { Request, Response } from "express";
import {
  IFinancialRecord,
  IFinancialRecordResponse,
  emptyFinancialRecord,
} from "../../domain/models/financial-record";
import { FinancialRecordUseCase } from "../../domain/usecases/financial-record.usecase";
import { FinancialRecordRepository } from "../../data/repositories/impl/financial-record.repository";
import { FinancialRecordMapper } from "../mappers/mapper";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { FinancialRecordRequestDto } from "../dtos/financial-record-request.dto";

const financialRecordRepository = new FinancialRecordRepository();
const financialRecordUseCase = new FinancialRecordUseCase(
  financialRecordRepository
);
const financialRecordMapper = new FinancialRecordMapper();

export class FinancialRecordsController {
  async createFinancialRecord(
    req: Request,
    res: Response<IFinancialRecordResponse>
  ): Promise<void> {
    const dto = new FinancialRecordRequestDto(req.body);
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
        const financialRecordResponse =
          await financialRecordUseCase.createFinancialRecord(dto.toData());

        res.status(201).json({
          data: financialRecordResponse.toJSON<IFinancialRecord>(),
          message: "FinancialRecord created Successfully!",
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
      const financialRecordes = await financialRecordUseCase.getAll();
      const financialRecordesDTO =
        financialRecordMapper.toDTOs(financialRecordes);

      res.json({
        data: financialRecordesDTO,
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

  async getFinancialRecordById(
    req: Request,
    res: Response<IFinancialRecordResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const financialRecord =
        await financialRecordUseCase.getFinancialRecordById(id);
      if (!financialRecord) {
        throw new NotFoundException("FinancialRecord", id);
      }
      const financialRecordDTO = financialRecordMapper.toDTO(financialRecord);
      res.json({
        data: financialRecordDTO,
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

  async updateFinancialRecord(
    req: Request,
    res: Response<IFinancialRecordResponse>
  ): Promise<void> {
    const dto = new FinancialRecordRequestDto(req.body);
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

        const obj: IFinancialRecord = {
          ...emptyFinancialRecord,
          ...req.body,
          id: id,
        };
        const updatedFinancialRecord =
          await financialRecordUseCase.updateFinancialRecord(obj);
        const financialRecordDto = financialRecordMapper.toDTO(
          updatedFinancialRecord
        );

        res.json({
          data: financialRecordDto,
          message: "FinancialRecord Updated Successfully!",
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

  async deleteFinancialRecord(
    req: Request,
    res: Response<IFinancialRecordResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await financialRecordUseCase.deleteFinancialRecord(id);

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
