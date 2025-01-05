"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUseCase = void 0;
class CategoryUseCase {
    categoryRepository;
    /**
     *
     */
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createCategory(category) {
        const existingCategory = await this.categoryRepository.findByName(category.name);
        if (existingCategory) {
            throw new Error("Category already exists");
        }
        // const _category = new Category({category});
        //because it's already done in the Repository
        return this.categoryRepository.create(category);
    }
    async getAll() {
        return this.categoryRepository.getAll();
    }
    async getCategoryById(id) {
        return this.categoryRepository.findById(id);
    }
    async updateCategory(category) {
        const { id, name } = category;
        const obj = {
            id,
            name,
        };
        return this.categoryRepository.update(obj);
    }
    async deleteCategory(id) {
        return this.categoryRepository.delete(id);
    }
}
exports.CategoryUseCase = CategoryUseCase;
