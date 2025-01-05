import { Request, Response } from "express";
import {
  IMeetingMinute,
  IMeetingMinuteResponse,
  emptyMeetingMinute,
} from "../../domain/models/meeting-minute";
import { MeetingMinuteUseCase } from "../../domain/usecases/meeting-minute.usecase";
import { MeetingMinuteRepository } from "../../data/repositories/impl/meeting-minute.repository";
import { MeetingMinuteMapper } from "../mappers/mapper";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { MeetingMinuteRequestDto } from "../dtos/meeting-minute-request.dto";

const meetingMinuteRepository = new MeetingMinuteRepository();
const meetingMinuteUseCase = new MeetingMinuteUseCase(meetingMinuteRepository);
const meetingMinuteMapper = new MeetingMinuteMapper();

export class MeetingMinutsController {
  async createMeetingMinute(
    req: Request,
    res: Response<IMeetingMinuteResponse>
  ): Promise<void> {
    const dto = new MeetingMinuteRequestDto(req.body);
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
        const meetingMinuteResponse =
          await meetingMinuteUseCase.createMeetingMinute(dto.toData());

        res.status(201).json({
          data: meetingMinuteResponse.toJSON<IMeetingMinute>(),
          message: "MeetingMinute created Successfully!",
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
      const meetingMinutees = await meetingMinuteUseCase.getAll();
      const meetingMinuteesDTO = meetingMinuteMapper.toDTOs(meetingMinutees);

      res.json(meetingMinuteesDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getMeetingMinuteById(
    req: Request,
    res: Response<IMeetingMinuteResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const meetingMinute = await meetingMinuteUseCase.getMeetingMinuteById(id);
      if (!meetingMinute) {
        throw new NotFoundException("MeetingMinute", id);
      }
      const meetingMinuteDTO = meetingMinuteMapper.toDTO(meetingMinute);
      res.json({
        data: meetingMinuteDTO,
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

  async updateMeetingMinute(
    req: Request,
    res: Response<IMeetingMinuteResponse>
  ): Promise<void> {
    const dto = new MeetingMinuteRequestDto(req.body);
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

        const obj: IMeetingMinute = {
          ...emptyMeetingMinute,
          ...req.body,
          id: id,
        };
        const updatedMeetingMinute =
          await meetingMinuteUseCase.updateMeetingMinute(obj);
        const meetingMinuteDto =
          meetingMinuteMapper.toDTO(updatedMeetingMinute);

        res.json({
          data: meetingMinuteDto,
          message: "MeetingMinute Updated Successfully!",
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

  async deleteMeetingMinute(
    req: Request,
    res: Response<IMeetingMinuteResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await meetingMinuteUseCase.deleteMeetingMinute(id);

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
