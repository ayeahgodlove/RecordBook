import { MeetingMinute } from "../../data/entities/meeting-minute";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IMeetingMinute } from "../models/meeting-minute";
export class MeetingMinuteUseCase {
  /**
   *
   */
  constructor(
    private readonly meetingMinuteRepository: IRepository<
      IMeetingMinute,
      MeetingMinute
    >
  ) {}

  async createMeetingMinute(
    meetingMinute: IMeetingMinute
  ): Promise<MeetingMinute> {
    const existingMeetingMinute =
      (await this.meetingMinuteRepository.findByName(
        meetingMinute.title
      )) as any;

    if (existingMeetingMinute) {
      throw new Error("MeetingMinute already exists");
    }

    // const _meetingMinute = new MeetingMinute({meetingMinute});
    //because it's already done in the Repository
    return this.meetingMinuteRepository.create(meetingMinute);
  }

  async getAll(): Promise<MeetingMinute[]> {
    return this.meetingMinuteRepository.getAll();
  }

  async getMeetingMinuteById(id: string): Promise<MeetingMinute | null> {
    return this.meetingMinuteRepository.findById(id);
  }

  async updateMeetingMinute(
    meetingMinute: IMeetingMinute
  ): Promise<MeetingMinute> {
    return this.meetingMinuteRepository.update(meetingMinute);
  }

  async deleteMeetingMinute(id: string): Promise<void> {
    return this.meetingMinuteRepository.delete(id);
  }
}
