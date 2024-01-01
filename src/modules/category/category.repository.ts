import { HttpErrorMessage } from "../../constants/httpResponse";
import { Repository } from "../common/repository";
import { type CategoryDto } from "./category.dto";
import { CategoryEntity } from "./category.entity";

export class CategoryRepository extends Repository {
    async getCategoryById(id: number): Promise<CategoryDto> {
        const category = await this.poolWrapper.findOne<CategoryDto>("*", { id })
        return category
    }

    async getCategoryByName(name: string): Promise<CategoryDto> {
        const category = await this.poolWrapper.findOne<CategoryDto>("*", { name })
        return category
    }

    async getCategoryByUserId(userId: number): Promise<CategoryDto[]> {
        const categories = await this.poolWrapper.findAll<CategoryDto>("*", { userId })
        return categories
    }

    async createCategory(categoryDto: CategoryDto): Promise<CategoryDto> {
        const category: CategoryDto = {
            ...categoryDto,
            [CategoryEntity.CREATED_AT]: new Date().toISOString(),
            [CategoryEntity.UPDATED_AT]: new Date().toISOString(),
            [CategoryEntity.IS_ACTIVE]: true,
            [CategoryEntity.DELETED_AT]: null,
        }
        const newCategories = await this.poolWrapper.create<CategoryDto>(category)
        return newCategories[0]
    }

    async updateCategory(categoryDto: CategoryDto): Promise<CategoryDto> {
        const { id, name, description, isActive } = categoryDto
        const foundCategory = await this.getCategoryById(categoryDto.id)
        if (!foundCategory) throw new Error(HttpErrorMessage.NOT_FOUND.NO_RECORD);

        const updatedColumns = {
            [CategoryEntity.NAME]: name ?? foundCategory.name,
            [CategoryEntity.DESCRIPTION]: description ?? foundCategory.description,
            [CategoryEntity.IS_ACTIVE]: isActive ?? foundCategory.isActive,
            [CategoryEntity.UPDATED_AT]: new Date().toISOString()
        }
        const newCategories = await this.poolWrapper.updateEntity<CategoryDto>(updatedColumns, { id })
        return newCategories[0]
    }

    async deleteCategory(id: number): Promise<void> {
        const foundCategory = await this.getCategoryById(id);
        if (!foundCategory) throw new Error(HttpErrorMessage.NOT_FOUND.NO_RECORD);

        const updatedColumn = {
            [CategoryEntity.DELETED_AT]: new Date().toISOString()
        }

        await this.poolWrapper.updateEntity<CategoryDto>(updatedColumn, { id });
    }
}
