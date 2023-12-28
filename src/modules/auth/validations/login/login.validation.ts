import { loginRegexValidations, loginStringValidations } from "./login.schema";
import { type IValidation } from "../../../../types/validation";
import { isRequiredValidation } from "../../../../utils/commonValidations";

export const loginValidation: IValidation = {
    password: {
        required: isRequiredValidation("password"),
        validations: { regex: loginRegexValidations.password, string: loginStringValidations.password }
    },
    email: {
        required: isRequiredValidation("email"),
        validations: { regex: loginRegexValidations.email, string: loginStringValidations.email }
    }
}