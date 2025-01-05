"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingMinuteUseCase = void 0;
class MeetingMinuteUseCase {
    meetingMinuteRepository;
    /**
     *
     */
    constructor(meetingMinuteRepository) {
        this.meetingMinuteRepository = meetingMinuteRepository;
    }
    async createMeetingMinute(meetingMinute) {
        const existingMeetingMinute = (await this.meetingMinuteRepository.findByName(meetingMinute.title));
        if (existingMeetingMinute) {
            throw new Error("MeetingMinute already exists");
        }
        // const _meetingMinute = new MeetingMinute({meetingMinute});
        //because it's already done in the Repository
        return this.meetingMinuteRepository.create(meetingMinute);
    }
    async getAll() {
        return this.meetingMinuteRepository.getAll();
    }
    async getMeetingMinuteById(id) {
        return this.meetingMinuteRepository.findById(id);
    }
    async updateMeetingMinute(meetingMinute) {
        return this.meetingMinuteRepository.update(meetingMinute);
    }
    async deleteMeetingMinute(id) {
        return this.meetingMinuteRepository.delete(id);
    }
}
exports.MeetingMinuteUseCase = MeetingMinuteUseCase;
