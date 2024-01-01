import type { IValidation } from "../../../types/validation";
import { isRequiredValidation } from "../../../utils/commonValidations";

export const createCategoryValidation: IValidation = {
    name: {
        required: isRequiredValidation("name"),
        validations: {}
    },
    description: {
        required: isRequiredValidation("description"),
        validations: {}
    },
}