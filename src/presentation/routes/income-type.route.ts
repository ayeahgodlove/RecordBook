// src/infrastructure/routes/incomeType-routes.ts
import { Router } from "express";
import { IncomeTypesController } from "../controllers/income-type.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const incomeTypeController = new IncomeTypesController();

const incomeTypeRouter = Router();

incomeTypeRouter.get("", incomeTypeController.getAll);
incomeTypeRouter.get("/:id", incomeTypeController.getIncomeTypeById);
incomeTypeRouter.post("",isAuthenticatedMiddleware, incomeTypeController.createIncomeType);
incomeTypeRouter.put("/:id",isAuthenticatedMiddleware, incomeTypeController.updateIncomeType);
incomeTypeRouter.delete("/:id",isAuthenticatedMiddleware, incomeTypeController.deleteIncomeType);

export default incomeTypeRouter;
