"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/meetingMinute-routes.ts
const express_1 = require("express");
const meeting_minute_controller_1 = require("../controllers/meeting-minute.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const meetingMinuteController = new meeting_minute_controller_1.MeetingMinutsController();
const meetingMinuteRouter = (0, express_1.Router)();
meetingMinuteRouter.get("", meetingMinuteController.getAll);
meetingMinuteRouter.get("/:id", meetingMinuteController.getMeetingMinuteById);
meetingMinuteRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, meetingMinuteController.createMeetingMinute);
meetingMinuteRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, meetingMinuteController.updateMeetingMinute);
meetingMinuteRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, meetingMinuteController.deleteMeetingMinute);
exports.default = meetingMinuteRouter;
