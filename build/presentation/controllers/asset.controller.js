"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsController = void 0;
const asset_1 = require("../../domain/models/asset");
const asset_usecase_1 = require("../../domain/usecases/asset.usecase");
const asset_repository_1 = require("../../data/repositories/impl/asset.repository");
const mapper_1 = require("../mappers/mapper");
const asset_request_dto_1 = require("../dtos/asset-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const assetRepository = new asset_repository_1.AssetRepository();
const assetUseCase = new asset_usecase_1.AssetUseCase(assetRepository);
const assetMapper = new mapper_1.AssetMapper();
class AssetsController {
    async createAsset(req, res) {
        const dto = new asset_request_dto_1.AssetRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const assetResponse = await assetUseCase.createAsset(dto.toData());
                res.status(201).json({
                    data: assetResponse.toJSON(),
                    message: "Asset created Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [],
                    success: false,
                });
            }
        }
    }
    async getAll(req, res) {
        try {
            const assetes = await assetUseCase.getAll();
            const assetesDTO = assetMapper.toDTOs(assetes);
            res.json(assetesDTO);
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getAssetById(req, res) {
        try {
            const id = req.params.id;
            const asset = await assetUseCase.getAssetById(id);
            if (!asset) {
                throw new not_found_exception_1.NotFoundException("Asset", id);
            }
            const assetDTO = assetMapper.toDTO(asset);
            res.json({
                data: assetDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async updateAsset(req, res) {
        const dto = new asset_request_dto_1.AssetRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...asset_1.emptyAsset,
                    ...req.body,
                    id: id,
                };
                const updatedAsset = await assetUseCase.updateAsset(obj);
                const assetDto = assetMapper.toDTO(updatedAsset);
                res.json({
                    data: assetDto,
                    message: "Asset Updated Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [error],
                    success: false,
                });
            }
        }
    }
    async deleteAsset(req, res) {
        try {
            const id = req.params.id;
            await assetUseCase.deleteAsset(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: true,
            });
        }
    }
}
exports.AssetsController = AssetsController;
