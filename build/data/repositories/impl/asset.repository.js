"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetRepository = void 0;
const asset_1 = require("../../entities/asset");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
class AssetRepository {
    /**
     *
     */
    constructor() { }
    /**
     * Receives a Asset as parameter
     * @asset
     * returns void
     */
    async create(asset) {
        try {
            return await asset_1.Asset.create({ ...asset });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns Asset
     */
    async findById(id) {
        try {
            const assetItem = await asset_1.Asset.findByPk(id);
            if (!assetItem) {
                throw new not_found_exception_1.NotFoundException("Asset", id);
            }
            return assetItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns Asset
     */
    async findByName(name) {
        try {
            const assetItem = await asset_1.Asset.findOne({ where: { name } });
            return assetItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of Asset
     */
    async getAll() {
        try {
            const categories = await asset_1.Asset.findAll();
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a Asset as parameter
     * @asset
     * returns void
     */
    async update(asset) {
        const { id } = asset;
        try {
            const assetItem = await asset_1.Asset.findByPk(id);
            console.log(asset);
            if (!assetItem) {
                throw new not_found_exception_1.NotFoundException("Asset", id.toString());
            }
            return await assetItem.update({ ...asset });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const assetItem = await asset_1.Asset.findByPk(id);
            if (!assetItem) {
                throw new not_found_exception_1.NotFoundException("Asset", id);
            }
            await assetItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AssetRepository = AssetRepository;
