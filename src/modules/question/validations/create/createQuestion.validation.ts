import { nullMethodValidation } from "../../../../constants/nullMethodValidation";
import { type IValidation } from "../../../../types/validation";
import { isRequiredValidation } from "../../../../utils/commonValidations";
import { type QuestionDto } from "../../question.dto";
import { createQuestionEnumValidations } from "./createQuestion.schema";

export const createQuestionValidation: IValidation<QuestionDto> = {
    categoryId: {
        required: isRequiredValidation("category"),
        validations: {}
    },
    type: {
        required: isRequiredValidation("type"),
        validations: {
            enum: createQuestionEnumValidations.type
        }
    },
    body: {
        required: isRequiredValidation("body"),
        validations: {}
    },
    userId: nullMethodValidation,
    createdAt: nullMethodValidation,
    deletedAt: nullMethodValidation,
    id: nullMethodValidation,
    updatedAt: nullMethodValidation,

}