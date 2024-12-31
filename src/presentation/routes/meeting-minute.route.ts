// src/infrastructure/routes/meetingMinute-routes.ts
import { Router } from "express";
import { MeetingMinutsController } from "../controllers/meeting-minute.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const meetingMinuteController = new MeetingMinutsController();

const meetingMinuteRouter = Router();

meetingMinuteRouter.get("", meetingMinuteController.getAll);
meetingMinuteRouter.get("/:id", meetingMinuteController.getMeetingMinuteById);
meetingMinuteRouter.post("", isAuthenticatedMiddleware, meetingMinuteController.createMeetingMinute);
meetingMinuteRouter.put("/:id", isAuthenticatedMiddleware, meetingMinuteController.updateMeetingMinute);
meetingMinuteRouter.delete("/:id", isAuthenticatedMiddleware, meetingMinuteController.deleteMeetingMinute);

export default meetingMinuteRouter;
