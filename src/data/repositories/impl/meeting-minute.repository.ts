import { MeetingMinute } from "../../entities/meeting-minute";
import { IMeetingMinute } from "../../../domain/models/meeting-minute";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class MeetingMinuteRepository implements IRepository<IMeetingMinute, MeetingMinute> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a MeetingMinute as parameter
   * @meetingMinute
   * returns void
   */
  async create(meetingMinute: IMeetingMinute): Promise<MeetingMinute> {
    try {
      return await MeetingMinute.create<MeetingMinute>({ ...meetingMinute });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns MeetingMinute
   */
  async findById(id: string): Promise<MeetingMinute | null> {
    try {
      const meetingMinuteItem = await MeetingMinute.findByPk(id);

      if (!meetingMinuteItem) {
        throw new NotFoundException("MeetingMinute", id);
      }
      return meetingMinuteItem;
    } catch (error) {
      throw error;
    }
  }

    /**
     * Receives a String as parameter
     * @title
     * returns MeetingMinute
     */
    async findByName(title: string): Promise<MeetingMinute | null> {
      try {
        const meetingMinuteItem = await MeetingMinute.findOne({ where: { title } });
        return meetingMinuteItem;
      } catch (error) {
        throw error;
      }
    }

  /*
   * Returns an array of MeetingMinute
   */
  async getAll(): Promise<MeetingMinute[]> {
    try {
      const minutes = await MeetingMinute.findAll();
      return minutes;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a MeetingMinute as parameter
   * @meetingMinute
   * returns void
   */
  async update(meetingMinute: IMeetingMinute): Promise<MeetingMinute> {
    const { id } = meetingMinute;
    try {
      const meetingMinuteItem: any = await MeetingMinute.findByPk(id);

      console.log(meetingMinute);
      if (!meetingMinuteItem) {
        throw new NotFoundException("MeetingMinute", id.toString());
      }

      return await meetingMinuteItem.update({ ...meetingMinute });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const meetingMinuteItem = await MeetingMinute.findByPk(id);

      if (!meetingMinuteItem) {
        throw new NotFoundException("MeetingMinute", id);
      }

      await meetingMinuteItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
