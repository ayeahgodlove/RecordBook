// src/infrastructure/routes/financialRecord-routes.ts
import { Router } from "express";
import { FinancialRecordsController } from "../controllers/financial-record.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const financialRecordController = new FinancialRecordsController();

const financialRecordRouter = Router();

financialRecordRouter.get("", financialRecordController.getAll);
financialRecordRouter.get("/:id", financialRecordController.getFinancialRecordById);
financialRecordRouter.post("", isAuthenticatedMiddleware, financialRecordController.createFinancialRecord);
financialRecordRouter.put("/:id", isAuthenticatedMiddleware, financialRecordController.updateFinancialRecord);
financialRecordRouter.delete("/:id", isAuthenticatedMiddleware, financialRecordController.deleteFinancialRecord);

export default financialRecordRouter;
