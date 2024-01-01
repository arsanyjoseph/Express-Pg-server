import { nullMethodValidation } from "../../../constants/nullMethodValidation";
import type { IValidation } from "../../../types/validation";
import { isRequiredValidation } from "../../../utils/commonValidations";
import { type CategoryDto } from "../category.dto";

export const updateCategoryValidation: IValidation<CategoryDto> = {
    id: {
        required: isRequiredValidation("id"),
        validations: {}
    },
    createdAt: nullMethodValidation,
    deletedAt: nullMethodValidation,
    description: nullMethodValidation,
    isActive: nullMethodValidation,
    name: nullMethodValidation,
    updatedAt: nullMethodValidation,
    userId: nullMethodValidation,
}