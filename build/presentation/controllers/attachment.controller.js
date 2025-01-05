"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsController = void 0;
const attachment_1 = require("../../domain/models/attachment");
const attachment_usecase_1 = require("../../domain/usecases/attachment.usecase");
const attachment_repository_1 = require("../../data/repositories/impl/attachment.repository");
const mapper_1 = require("../mappers/mapper");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const attachment_request_dto_1 = require("../dtos/attachment-request.dto");
const attachmentRepository = new attachment_repository_1.AttachmentRepository();
const attachmentUseCase = new attachment_usecase_1.AttachmentUseCase(attachmentRepository);
const attachmentMapper = new mapper_1.AttachmentMapper();
class AttachmentsController {
    async createAttachment(req, res) {
        const dto = new attachment_request_dto_1.AttachmentRequestDto(req.body);
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
                const attachmentResponse = await attachmentUseCase.createAttachment(dto.toData());
                res.status(201).json({
                    data: attachmentResponse.toJSON(),
                    message: "Attachment created Successfully!",
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
            const attachmentes = await attachmentUseCase.getAll();
            const attachmentesDTO = attachmentMapper.toDTOs(attachmentes);
            res.json({
                data: attachmentesDTO,
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
    async getAttachmentById(req, res) {
        try {
            const id = req.params.id;
            const attachment = await attachmentUseCase.getAttachmentById(id);
            if (!attachment) {
                throw new not_found_exception_1.NotFoundException("Attachment", id);
            }
            const attachmentDTO = attachmentMapper.toDTO(attachment);
            res.json({
                data: attachmentDTO,
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
    async updateAttachment(req, res) {
        const dto = new attachment_request_dto_1.AttachmentRequestDto(req.body);
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
                    ...attachment_1.emptyAttachment,
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
    async deleteAttachment(req, res) {
        try {
            const id = req.params.id;
            await attachmentUseCase.deleteAttachment(id);
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
exports.AttachmentsController = AttachmentsController;
