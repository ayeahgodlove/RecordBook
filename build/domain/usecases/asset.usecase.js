"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetUseCase = void 0;
class AssetUseCase {
    assetRepository;
    /**
     *
     */
    constructor(assetRepository) {
        this.assetRepository = assetRepository;
    }
    async createAsset(asset) {
        const existingAsset = (await this.assetRepository.findByName(asset.name));
        if (existingAsset) {
            throw new Error("Asset already exists");
        }
        // const _asset = new Asset({asset});
        //because it's already done in the Repository
        return this.assetRepository.create(asset);
    }
    async getAll() {
        return this.assetRepository.getAll();
    }
    async getAssetById(id) {
        return this.assetRepository.findById(id);
    }
    async updateAsset(asset) {
        return this.assetRepository.update(asset);
    }
    async deleteAsset(id) {
        return this.assetRepository.delete(id);
    }
}
exports.AssetUseCase = AssetUseCase;
