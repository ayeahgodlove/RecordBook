"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/expenseType-routes.ts
const express_1 = require("express");
const expense_type_controller_1 = require("../controllers/expense-type.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const expenseTypeController = new expense_type_controller_1.ExpenseTypesController();
const expenseTypeRouter = (0, express_1.Router)();
expenseTypeRouter.get("", expenseTypeController.getAll);
expenseTypeRouter.get("/:id", expenseTypeController.getExpenseTypeById);
expenseTypeRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, expenseTypeController.createExpenseType);
expenseTypeRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, expenseTypeController.updateExpenseType);
expenseTypeRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, expenseTypeController.deleteExpenseType);
exports.default = expenseTypeRouter;
