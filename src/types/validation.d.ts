
export interface IRegexValidation {
    regex: RegExp,
    errMessage: string
}
export interface IStringValidation {
    test: (s: string) => boolean,
    errMessage: string
}

export interface IEnumValidation {
    test: (s: string | number, ref: Array<string | number>) => boolean,
    ref: Array<number | string>
    errMessage: string
}

type ValidationType<T> = Record<string, Record<string, T>>

export interface MethodValidation {
    required: {
        value: boolean,
        errMessage: string
    }
    validations: {
        regex?: Record<string, IRegexValidation>,
        string?: Record<string, IStringValidation>,
        enum?: Record<string, IEnumValidation>,
    }
}

export type IValidation<T> = Record<keyof T, MethodValidation>

export interface SanityOptions {
    sanitizeRequest: boolean
    silentProcess: boolean
}