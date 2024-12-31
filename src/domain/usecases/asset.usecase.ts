import { Asset } from "../../data/entities/asset";
import { IRepository } from "../../data/repositories/contracts/repository.base";
import { IAsset } from "../models/asset";
export class AssetUseCase {
  /**
   *
   */
  constructor(
    private readonly assetRepository: IRepository<IAsset, Asset>
  ) {}

  async createAsset(asset: IAsset): Promise<Asset> {
    const existingAsset = (await this.assetRepository.findByName(
      asset.name
    )) as any;

    if (existingAsset) {
      throw new Error("Asset already exists");
    }

    // const _asset = new Asset({asset});
    //because it's already done in the Repository
    return this.assetRepository.create(asset);
  }

  async getAll(): Promise<Asset[]> {
    return this.assetRepository.getAll();
  }

  async getAssetById(id: string): Promise<Asset | null> {
    return this.assetRepository.findById(id);
  }

  async updateAsset(asset: IAsset): Promise<Asset> {
    return this.assetRepository.update(asset);
  }

  async deleteAsset(id: string): Promise<void> {
    return this.assetRepository.delete(id);
  }
}
