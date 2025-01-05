"use strict";
// src/presentation/dtos/meetingMinute-request.dto.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingMinuteRequestDto = void 0;
const class_validator_1 = require("class-validator");
const meeting_minute_1 = require("../../domain/models/meeting-minute");
const nanoid_1 = require("nanoid");
// meetingDate: Date;
class MeetingMinuteRequestDto {
    title;
    content;
    createdBy;
    meetingDate;
    constructor(data) {
        this.title = data.title;
        this.content = data.content;
        this.meetingDate = data.meetingDate;
        this.createdBy = data.createdBy;
    }
    toData() {
        return {
            ...meeting_minute_1.emptyMeetingMinute,
            id: (0, nanoid_1.nanoid)(10),
            title: this.title,
            content: this.content,
            meetingDate: this.meetingDate,
            createdBy: this.createdBy,
        };
    }
    toUpdateData(data) {
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            meetingDate: data.meetingDate,
            createdBy: data.createdBy,
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MeetingMinuteRequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MeetingMinuteRequestDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MeetingMinuteRequestDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], MeetingMinuteRequestDto.prototype, "meetingDate", void 0);
exports.MeetingMinuteRequestDto = MeetingMinuteRequestDto;
