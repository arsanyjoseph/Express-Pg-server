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
        validations: { regex: registerRegexValidations.email, string: registerStringValidations.email }
    },
    firstName: {
        required: isRequiredValidation("firstName"),
        validations: { regex: registerRegexValidations.firstName, string: registerStringValidations.firstName }
    },
    lastName: {
        required: isRequiredValidation("lastName"),
        validations: { regex: registerRegexValidations.lastName, string: registerStringValidations.lastName }
    },
}