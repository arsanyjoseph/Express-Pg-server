import { registerRegexValidations, registerStringValidations } from "./register.schema";
import { type IValidation } from "../../../../types/validation";
import { isRequiredValidation } from "../../../../utils/commonValidations";

export const registerValidation: IValidation = {
    password: {
        required: isRequiredValidation("password"),
        validations: { regex: registerRegexValidations.password, string: registerStringValidations.password }
    },
    email: {
        required: isRequiredValidation("email"),
        validations: {}
    },
    firstName: {
        required: isRequiredValidation("firstName"),
        validations: {}
    },
    lastName: {
        required: isRequiredValidation("lastName"),
        validations: {}
    },
}