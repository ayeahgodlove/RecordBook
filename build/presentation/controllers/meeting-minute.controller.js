"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingMinutsController = void 0;
const meeting_minute_1 = require("../../domain/models/meeting-minute");
const meeting_minute_usecase_1 = require("../../domain/usecases/meeting-minute.usecase");
const meeting_minute_repository_1 = require("../../data/repositories/impl/meeting-minute.repository");
const mapper_1 = require("../mappers/mapper");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const meeting_minute_request_dto_1 = require("../dtos/meeting-minute-request.dto");
const meetingMinuteRepository = new meeting_minute_repository_1.MeetingMinuteRepository();
const meetingMinuteUseCase = new meeting_minute_usecase_1.MeetingMinuteUseCase(meetingMinuteRepository);
const meetingMinuteMapper = new mapper_1.MeetingMinuteMapper();
class MeetingMinutsController {
    async createMeetingMinute(req, res) {
        const dto = new meeting_minute_request_dto_1.MeetingMinuteRequestDto(req.body);
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
                const meetingMinuteResponse = await meetingMinuteUseCase.createMeetingMinute(dto.toData());
                res.status(201).json({
                    data: meetingMinuteResponse.toJSON(),
                    message: "MeetingMinute created Successfully!",
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
            const meetingMinutees = await meetingMinuteUseCase.getAll();
            const meetingMinuteesDTO = meetingMinuteMapper.toDTOs(meetingMinutees);
            res.json(meetingMinuteesDTO);
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
    async getMeetingMinuteById(req, res) {
        try {
            const id = req.params.id;
            const meetingMinute = await meetingMinuteUseCase.getMeetingMinuteById(id);
            if (!meetingMinute) {
                throw new not_found_exception_1.NotFoundException("MeetingMinute", id);
            }
            const meetingMinuteDTO = meetingMinuteMapper.toDTO(meetingMinute);
            res.json({
                data: meetingMinuteDTO,
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
    async updateMeetingMinute(req, res) {
        const dto = new meeting_minute_request_dto_1.MeetingMinuteRequestDto(req.body);
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
                    ...meeting_minute_1.emptyMeetingMinute,
                    ...req.body,
                    id: id,
                };
                const updatedMeetingMinute = await meetingMinuteUseCase.updateMeetingMinute(obj);
                const meetingMinuteDto = meetingMinuteMapper.toDTO(updatedMeetingMinute);
                res.json({
                    data: meetingMinuteDto,
                    message: "MeetingMinute Updated Successfully!",
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
    async deleteMeetingMinute(req, res) {
        try {
            const id = req.params.id;
            await meetingMinuteUseCase.deleteMeetingMinute(id);
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
exports.MeetingMinutsController = MeetingMinutsController;
