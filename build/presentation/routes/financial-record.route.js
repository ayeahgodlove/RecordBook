"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/financialRecord-routes.ts
const express_1 = require("express");
const financial_record_controller_1 = require("../controllers/financial-record.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const financialRecordController = new financial_record_controller_1.FinancialRecordsController();
const financialRecordRouter = (0, express_1.Router)();
financialRecordRouter.get("", financialRecordController.getAll);
financialRecordRouter.get("/:id", financialRecordController.getFinancialRecordById);
financialRecordRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, financialRecordController.createFinancialRecord);
financialRecordRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, financialRecordController.updateFinancialRecord);
financialRecordRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, financialRecordController.deleteFinancialRecord);
exports.default = financialRecordRouter;
