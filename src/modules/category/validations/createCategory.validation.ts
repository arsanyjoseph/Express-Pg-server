import { nullMethodValidation } from "../../../constants/nullMethodValidation";
import type { IValidation } from "../../../types/validation";
import { isRequiredValidation } from "../../../utils/commonValidations";
import { type CategoryDto } from "../category.dto";

export const createCategoryValidation: IValidation<Partial<CategoryDto>> = {
    name: {
        required: isRequiredValidation("name"),
        validations: {}
    },
    description: {
        required: isRequiredValidation("description"),
        validations: {}
    },
    createdAt: nullMethodValidation,
    deletedAt: nullMethodValidation,
    id: nullMethodValidation,
    isActive: nullMethodValidation,
    updatedAt: nullMethodValidation,
    userId: nullMethodValidation
}