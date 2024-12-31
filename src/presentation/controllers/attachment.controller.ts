import { Request, Response } from "express";
import {
  IAttachment,
  IAttachmentResponse,
  emptyAttachment,
} from "../../domain/models/attachment";
import { AttachmentUseCase } from "../../domain/usecases/attachment.usecase";
import { AttachmentRepository } from "../../data/repositories/impl/attachment.repository";
import { AttachmentMapper } from "../mappers/mapper";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { AttachmentRequestDto } from "../dtos/attachment-request.dto";

const attachmentRepository = new AttachmentRepository();
const attachmentUseCase = new AttachmentUseCase(attachmentRepository);
const attachmentMapper = new AttachmentMapper();

export class AttachmentsController {
  async createAttachment(
    req: Request,
    res: Response<IAttachmentResponse>
  ): Promise<void> {
    const dto = new AttachmentRequestDto(req.body);
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
        const attachmentResponse = await attachmentUseCase.createAttachment(
          dto.toData()
        );

        res.status(201).json({
          data: attachmentResponse.toJSON<IAttachment>(),
          message: "Attachment created Successfully!",
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
      const attachmentes = await attachmentUseCase.getAll();
      const attachmentesDTO = attachmentMapper.toDTOs(attachmentes);

      res.json({
        data: attachmentesDTO,
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

  async getAttachmentById(
    req: Request,
    res: Response<IAttachmentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const attachment = await attachmentUseCase.getAttachmentById(id);
      if (!attachment) {
        throw new NotFoundException("Attachment", id);
      }
      const attachmentDTO = attachmentMapper.toDTO(attachment);
      res.json({
        data: attachmentDTO,
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

  async updateAttachment(
    req: Request,
    res: Response<IAttachmentResponse>
  ): Promise<void> {
    const dto = new AttachmentRequestDto(req.body);
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

        const obj: IAttachment = {
          ...emptyAttachment,
          ...req.body,
          id: id,
        };
        const updatedAttachment = await attachmentUseCase.updateAttachment(obj);
        const attachmentDto = attachmentMapper.toDTO(updatedAttachment);

        res.json({
          data: attachmentDto,
          message: "Attachment Updated Successfully!",
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

  async deleteAttachment(
    req: Request,
    res: Response<IAttachmentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await attachmentUseCase.deleteAttachment(id);

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
