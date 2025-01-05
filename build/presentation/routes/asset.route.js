"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/asset-routes.ts
const express_1 = require("express");
const asset_controller_1 = require("../controllers/asset.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const assetController = new asset_controller_1.AssetsController();
const assetRouter = (0, express_1.Router)();
assetRouter.get("", assetController.getAll);
assetRouter.get("/:id", assetController.getAssetById);
assetRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, assetController.createAsset);
assetRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, assetController.updateAsset);
assetRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, assetController.deleteAsset);
exports.default = assetRouter;
