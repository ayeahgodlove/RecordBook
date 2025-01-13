import { Request, Response } from "express";
import {
  IRecordType,
  IRecordTypeResponse,
  emptyRecordType,
} from "../../domain/models/record-type";
import { RecordTypeUseCase } from "../../domain/usecases/record-type.usecase";
import { RecordTypeRepository } from "../../data/repositories/impl/record-type.repository";
import { RecordTypeMapper } from "../mappers/mapper";
import { RecordTypeRequestDto } from "../dtos/record-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const recordTypeRepository = new RecordTypeRepository();
const recordTypeUseCase = new RecordTypeUseCase(recordTypeRepository);
const recordTypeMapper = new RecordTypeMapper();

export class RecordTypesController {
  async createRecordType(
    req: Request,
    res: Response<IRecordTypeResponse>
  ): Promise<void> {
    const dto = new RecordTypeRequestDto(req.body);
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
        const recordTypeResponse = await recordTypeUseCase.createRecordType(
          dto.toData()
        );

        res.status(201).json({
          data: recordTypeResponse.toJSON<IRecordType>(),
          message: "Record Type created Successfully!",
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
      const recordTypes = await recordTypeUseCase.getAll();
      const recordTypesDTO = recordTypeMapper.toDTOs(recordTypes);

      res.json(recordTypesDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getRecordTypeById(
    req: Request,
    res: Response<IRecordTypeResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const recordType = await recordTypeUseCase.getRecordTypeById(id);
      if (!recordType) {
        throw new NotFoundException("RecordType", id);
      }
      const recordTypeDTO = recordTypeMapper.toDTO(recordType);
      res.json({
        data: recordTypeDTO,
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

  async updateRecordType(
    req: Request,
    res: Response<IRecordTypeResponse>
  ): Promise<void> {
    const dto = new RecordTypeRequestDto(req.body);
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

        const obj: IRecordType = {
          ...emptyRecordType,
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

  async deleteRecordType(
    req: Request,
    res: Response<IRecordTypeResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await recordTypeUseCase.deleteRecordType(id);

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
