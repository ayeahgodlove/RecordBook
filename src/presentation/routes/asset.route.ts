// src/infrastructure/routes/asset-routes.ts
import { Router } from "express";
import { AssetsController } from "../controllers/asset.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const assetController = new AssetsController();

const assetRouter = Router();

assetRouter.get("", assetController.getAll);
assetRouter.get("/:id", assetController.getAssetById);
assetRouter.post("", isAuthenticatedMiddleware, assetController.createAsset);
assetRouter.put("/:id", isAuthenticatedMiddleware, assetController.updateAsset);
assetRouter.delete("/:id", isAuthenticatedMiddleware, assetController.deleteAsset);

export default assetRouter;
