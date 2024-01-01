import type { IValidation } from "../../../types/validation";
import { isRequiredValidation } from "../../../utils/commonValidations";

export const updateCategoryValidation: IValidation = {
    id: {
        required: isRequiredValidation("id"),
        validations: {}
    }
}