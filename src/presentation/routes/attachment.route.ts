// src/infrastructure/routes/attachment-routes.ts
import { Router } from "express";
import { AttachmentsController } from "../controllers/attachment.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const attachmentController = new AttachmentsController();

const attachmentRouter = Router();

attachmentRouter.get("", attachmentController.getAll);
attachmentRouter.get("/:id", attachmentController.getAttachmentById);
attachmentRouter.post("", isAuthenticatedMiddleware, attachmentController.createAttachment);
attachmentRouter.put("/:id", isAuthenticatedMiddleware, attachmentController.updateAttachment);
attachmentRouter.delete("/:id", isAuthenticatedMiddleware, attachmentController.deleteAttachment);

export default attachmentRouter;
