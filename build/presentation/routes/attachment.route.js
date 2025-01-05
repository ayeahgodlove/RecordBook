"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/attachment-routes.ts
const express_1 = require("express");
const attachment_controller_1 = require("../controllers/attachment.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const attachmentController = new attachment_controller_1.AttachmentsController();
const attachmentRouter = (0, express_1.Router)();
attachmentRouter.get("", attachmentController.getAll);
attachmentRouter.get("/:id", attachmentController.getAttachmentById);
attachmentRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, attachmentController.createAttachment);
attachmentRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, attachmentController.updateAttachment);
attachmentRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, attachmentController.deleteAttachment);
exports.default = attachmentRouter;
