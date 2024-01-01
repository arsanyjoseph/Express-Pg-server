import { loginRegexValidations, loginStringValidations } from "./login.schema";
import { type IValidation } from "../../../../types/validation";
import { isRequiredValidation } from "../../../../utils/commonValidations";
import { type AuthDto } from "../../auth.dto";

export const loginValidation: IValidation<Partial<AuthDto>> = {
    password: {
        required: isRequiredValidation("password"),
        validations: { regex: loginRegexValidations.password, string: loginStringValidations.password }
    },
    email: {
        required: isRequiredValidation("email"),
        validations: { regex: loginRegexValidations.email, string: loginStringValidations.email }
    }
}