// src/infrastructure/routes/recordType-routes.ts
import { Router } from "express";
import { RecordTypesController } from "../controllers/record-type.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const recordTypeController = new RecordTypesController();

const recordTypeRouter = Router();

recordTypeRouter.get("", recordTypeController.getAll);
recordTypeRouter.get("/:id", recordTypeController.getRecordTypeById);
recordTypeRouter.post("",isAuthenticatedMiddleware, recordTypeController.createRecordType);
recordTypeRouter.put("/:id",isAuthenticatedMiddleware, recordTypeController.updateRecordType);
recordTypeRouter.delete("/:id",isAuthenticatedMiddleware, recordTypeController.deleteRecordType);

export default recordTypeRouter;
