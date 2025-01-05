import { Request, Response } from "express";
import {
  IAsset,
  IAssetResponse,
  emptyAsset,
} from "../../domain/models/asset";
import { AssetUseCase } from "../../domain/usecases/asset.usecase";
import { AssetRepository } from "../../data/repositories/impl/asset.repository";
import { AssetMapper } from "../mappers/mapper";
import { AssetRequestDto } from "../dtos/asset-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const assetRepository = new AssetRepository();
const assetUseCase = new AssetUseCase(assetRepository);
const assetMapper = new AssetMapper();

export class AssetsController {
  async createAsset(
    req: Request,
    res: Response<IAssetResponse>
  ): Promise<void> {
    const dto = new AssetRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const assetResponse = await assetUseCase.createAsset(
          dto.toData()
        );

        res.status(201).json({
          data: assetResponse.toJSON<IAsset>(),
          message: "Asset created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const assetes = await assetUseCase.getAll();
      const assetesDTO = assetMapper.toDTOs(assetes);

      res.json(assetesDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getAssetById(
    req: Request,
    res: Response<IAssetResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const asset = await assetUseCase.getAssetById(id);
      if (!asset) {
        throw new NotFoundException("Asset", id);
      }
      const assetDTO = assetMapper.toDTO(asset);
      res.json({
        data: assetDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateAsset(
    req: Request,
    res: Response<IAssetResponse>
  ): Promise<void> {
    const dto = new AssetRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IAsset = {
          ...emptyAsset,
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
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteAsset(
    req: Request,
    res: Response<IAssetResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await assetUseCase.deleteAsset(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}
