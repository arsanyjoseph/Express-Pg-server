import { nullMethodValidation } from "../../../../constants/nullMethodValidation";
import { type IValidation } from "../../../../types/validation";
import { isRequiredValidation } from "../../../../utils/commonValidations";
import { type QuestionDto } from "../../question.dto";

export const createQuestionValidation: IValidation<QuestionDto> = {
    categoryId: {
        required: isRequiredValidation("category"),
        validations: {}
    },
    userId: {
        required: isRequiredValidation("user"),
        validations: {}
    },
    type: {
        required: isRequiredValidation("type"),
        validations: {}
    },
    createdAt: nullMethodValidation,
    deletedAt: nullMethodValidation,
    id: nullMethodValidation,
    updatedAt: nullMethodValidation,

}