import { type MethodValidation } from "../types/validation";

export const nullMethodValidation: MethodValidation = {
    required: { value: false, errMessage: "" },
    validations: {}
}