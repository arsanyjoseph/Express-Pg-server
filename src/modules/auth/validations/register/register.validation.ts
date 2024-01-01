import { registerRegexValidations, registerStringValidations } from "./register.schema";
import { type IValidation } from "../../../../types/validation";
import { isRequiredValidation } from "../../../../utils/commonValidations";
import { type UserDto } from "../../../user/user.dto";
import { nullMethodValidation } from "../../../../constants/nullMethodValidation";

export const registerValidation: IValidation<UserDto> = {
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
    createdAt: nullMethodValidation,
    deletedAt: nullMethodValidation,
    id: nullMethodValidation,
    isActive: nullMethodValidation,
    role: nullMethodValidation,
    updatedAt: nullMethodValidation
}