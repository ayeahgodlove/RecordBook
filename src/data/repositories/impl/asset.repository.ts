import { Asset } from "../../entities/asset";
import { IAsset } from "../../../domain/models/asset";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IRepository } from "../contracts/repository.base";

export class AssetRepository implements IRepository<IAsset, Asset> {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Asset as parameter
   * @asset
   * returns void
   */
  async create(asset: IAsset): Promise<Asset> {
    try {
      return await Asset.create<Asset>({ ...asset });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Asset
   */
  async findById(id: string): Promise<Asset | null> {
    try {
      const assetItem = await Asset.findByPk(id);

      if (!assetItem) {
        throw new NotFoundException("Asset", id);
      }
      return assetItem;
    } catch (error) {
      throw error;
    }
  }

    /**
     * Receives a String as parameter
     * @name
     * returns Asset
     */
    async findByName(name: string): Promise<Asset | null> {
      try {
        const assetItem = await Asset.findOne({ where: { name } });
        return assetItem;
      } catch (error) {
        throw error;
      }
    }

  /*
   * Returns an array of Asset
   */
  async getAll(): Promise<Asset[]> {
    try {
      const categories = await Asset.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Asset as parameter
   * @asset
   * returns void
   */
  async update(asset: IAsset): Promise<Asset> {
    const { id } = asset;
    try {
      const assetItem: any = await Asset.findByPk(id);

      console.log(asset);
      if (!assetItem) {
        throw new NotFoundException("Asset", id.toString());
      }

      return await assetItem.update({ ...asset });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const assetItem = await Asset.findByPk(id);

      if (!assetItem) {
        throw new NotFoundException("Asset", id);
      }

      await assetItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
