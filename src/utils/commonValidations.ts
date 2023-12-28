import type { IStringValidation, MethodValidation } from "../types/validation"

const isString = (s: string): boolean => typeof s === "string"

const isStringErrMessage = (prop: string): string => `${prop} should be of type string`

const isRequiredErrorMessage = (prop: string): string => `${prop} is required`

export const isRequiredValidation = (prop: string): MethodValidation["required"] => ({ value: true, errMessage: isRequiredErrorMessage(prop) })

export const isStringValidation = (prop: string): IStringValidation => ({ errMessage: isStringErrMessage(prop), test: isString })