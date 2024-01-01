import { type CategoryDto } from "./category.dto";
import { type CategoryRepository } from "./category.repository";

export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async createCateogry(categoryDto: CategoryDto): Promise<CategoryDto> {
        return await this.categoryRepository.createCategory(categoryDto);
    }

    async getCategoryByName(name: string): Promise<CategoryDto> {
        return await this.categoryRepository.getCategoryByName(name);
    }

    async updateCategory(categoryDto: CategoryDto): Promise<CategoryDto> {
        return await this.categoryRepository.updateCategory(categoryDto)
    }

    async deleteCategory(id: number): Promise<void> {
        await this.categoryRepository.deleteCategory(id)
    }

}
