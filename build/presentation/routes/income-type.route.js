"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/incomeType-routes.ts
const express_1 = require("express");
const income_type_controller_1 = require("../controllers/income-type.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const incomeTypeController = new income_type_controller_1.IncomeTypesController();
const incomeTypeRouter = (0, express_1.Router)();
incomeTypeRouter.get("", incomeTypeController.getAll);
incomeTypeRouter.get("/:id", incomeTypeController.getIncomeTypeById);
incomeTypeRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, incomeTypeController.createIncomeType);
incomeTypeRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, incomeTypeController.updateIncomeType);
incomeTypeRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, incomeTypeController.deleteIncomeType);
exports.default = incomeTypeRouter;
