// src/infrastructure/routes/expenseType-routes.ts
import { Router } from "express";
import { ExpenseTypesController } from "../controllers/expense-type.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const expenseTypeController = new ExpenseTypesController();

const expenseTypeRouter = Router();

expenseTypeRouter.get("", expenseTypeController.getAll);
expenseTypeRouter.get("/:id", expenseTypeController.getExpenseTypeById);
expenseTypeRouter.post("",isAuthenticatedMiddleware, expenseTypeController.createExpenseType);
expenseTypeRouter.put("/:id",isAuthenticatedMiddleware, expenseTypeController.updateExpenseType);
expenseTypeRouter.delete("/:id",isAuthenticatedMiddleware, expenseTypeController.deleteExpenseType);

export default expenseTypeRouter;
