
export interface IRegexValidation {
    regex: RegExp,
    errMessage: string
}
export interface IStringValidation {
    test: (s: string) => boolean,
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
        string?: Record<string, IStringValidation>
    }
}

export type IValidation = Record<string, MethodValidation>