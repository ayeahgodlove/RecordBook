// src/presentation/dtos/meetingMinute-request.dto.ts

import { IsNotEmpty, IsString, Length } from "class-validator";
import { IMeetingMinute, emptyMeetingMinute } from "../../domain/models/meeting-minute";
import { nanoid } from "nanoid";



// meetingDate: Date;

export class MeetingMinuteRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  createdBy: string;

  @IsNotEmpty()
  meetingDate: Date;

  constructor(data: IMeetingMinute) {
    this.title = data.title;
    this.content = data.content;
    this.meetingDate = data.meetingDate;
    this.createdBy = data.createdBy;
  }

  toData(): IMeetingMinute {
    return {
      ...emptyMeetingMinute,
      id: nanoid(10),
      title: this.title,
      content: this.content,
      meetingDate: this.meetingDate,
      createdBy: this.createdBy,
    };
  }

  toUpdateData(data: IMeetingMinute): IMeetingMinute {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      meetingDate: data.meetingDate,
      createdBy: data.createdBy,
    };
  }
}
