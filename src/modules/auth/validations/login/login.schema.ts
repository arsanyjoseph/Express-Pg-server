import type { IRegexValidation, ValidationType, IStringValidation } from "../../../../types/validation"
import { isStringValidation } from "../../../../utils/commonValidations"

export const loginRegexValidations: ValidationType<IRegexValidation> = {
    email: {
        format: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errMessage: "Email must be of a valid format"
        }
    }
}

export const loginStringValidations: ValidationType<IStringValidation> = {
    password: {
        string: isStringValidation("password"),
    },
    email: {
        string: isStringValidation("email"),
    }
}