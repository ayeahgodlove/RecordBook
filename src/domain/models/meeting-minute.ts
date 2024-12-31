import { IBaseResponse } from "./base-response";

export interface IMeetingMinute {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  meetingDate: Date;
}

export const emptyMeetingMinute: IMeetingMinute = {
  id: "",
  createdBy: "",
  title: "",
  content: "",
  meetingDate: new Date(),
};

export interface IMeetingMinuteResponse extends IBaseResponse {
  data: IMeetingMinute | null | IMeetingMinute[];
}
