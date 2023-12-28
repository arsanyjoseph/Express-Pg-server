import type { IRegexValidation, ValidationType, IStringValidation } from "../../../../types/validation"
import { isStringValidation } from "../../../../utils/commonValidations"

export const registerRegexValidations: ValidationType<IRegexValidation> = {
    password: {
        uppercase: {
            regex: /[A -Z]/,
            errMessage: "Password should have at least one Uppercase character"
        },
        lowercase: {
            regex: /[a -z]/,
            errMessage: "Password should have at least one Lowercase character"
        },
        number: {
            regex: /\d/,
            errMessage: "Password should have at least one number character"
        },
        specialCharacter: {
            regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
            errMessage: "Password should have at least one Special character"
        },
    },
    email: {
        format: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errMessage: "Email must be of a valid format"
        }
    }
}

export const registerStringValidations: ValidationType<IStringValidation> = {
    password: {
        string: isStringValidation("password"),
        minLength: {
            test: (password: string) => password.length >= 8,
            errMessage: "Password should be at least 8 characters"
        },
        maxLength: {
            test: (password: string) => password.length <= 20,
            errMessage: "Password should not exceed 20 characters"
        },
    },
    email: {
        string: isStringValidation("email"),

    },
    firstName: {
        string: isStringValidation("firstName"),
    },
    lastName: {
        string: isStringValidation("lastName"),
    }
}