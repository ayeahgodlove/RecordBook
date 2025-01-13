"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/recordType-routes.ts
const express_1 = require("express");
const record_type_controller_1 = require("../controllers/record-type.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const recordTypeController = new record_type_controller_1.RecordTypesController();
const recordTypeRouter = (0, express_1.Router)();
recordTypeRouter.get("", recordTypeController.getAll);
recordTypeRouter.get("/:id", recordTypeController.getRecordTypeById);
recordTypeRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, recordTypeController.createRecordType);
recordTypeRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, recordTypeController.updateRecordType);
recordTypeRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, recordTypeController.deleteRecordType);
exports.default = recordTypeRouter;
