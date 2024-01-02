import { QuestionTypes } from "../../../../types/questionType";
import type { IEnumValidation, ValidationType } from "../../../../types/validation";
import { checkEnum } from "../../../../utils/commonValidations";

export const createQuestionEnumValidations: ValidationType<IEnumValidation> = {
    type: {
        enum: {
            test: checkEnum,
            errMessage: "Input is not a valid Type",
            ref: Object.values(QuestionTypes)
        },
    }
}