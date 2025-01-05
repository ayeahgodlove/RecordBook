"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingMinuteRepository = void 0;
const meeting_minute_1 = require("../../entities/meeting-minute");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class MeetingMinuteRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a MeetingMinute as parameter
     * @meetingMinute
     * returns void
     */
    async create(meetingMinute) {
        try {
            return await meeting_minute_1.MeetingMinute.create({ ...meetingMinute });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns MeetingMinute
     */
    async findById(id) {
        try {
            const meetingMinuteItem = await meeting_minute_1.MeetingMinute.findByPk(id);
            if (!meetingMinuteItem) {
                throw new not_found_exception_1.NotFoundException("MeetingMinute", id);
            }
            return meetingMinuteItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @title
     * returns MeetingMinute
     */
    async findByName(title) {
        try {
            const meetingMinuteItem = await meeting_minute_1.MeetingMinute.findOne({ where: { title } });
            return meetingMinuteItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of MeetingMinute
     */
    async getAll() {
        try {
            const minutes = await meeting_minute_1.MeetingMinute.findAll();
            return minutes;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a MeetingMinute as parameter
     * @meetingMinute
     * returns void
     */
    async update(meetingMinute) {
        const { id } = meetingMinute;
        try {
            const meetingMinuteItem = await meeting_minute_1.MeetingMinute.findByPk(id);
            console.log(meetingMinute);
            if (!meetingMinuteItem) {
                throw new not_found_exception_1.NotFoundException("MeetingMinute", id.toString());
            }
            return await meetingMinuteItem.update({ ...meetingMinute });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const meetingMinuteItem = await meeting_minute_1.MeetingMinute.findByPk(id);
            if (!meetingMinuteItem) {
                throw new not_found_exception_1.NotFoundException("MeetingMinute", id);
            }
            await meetingMinuteItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.MeetingMinuteRepository = MeetingMinuteRepository;
