import type { MethodValidation, IValidation, IRegexValidation, IStringValidation, IEnumValidation, SanityOptions } from './../types/validation.d';
import type { Request, NextFunction, Response } from "express"
import { type IError } from './errorHandler.middleware';
import { HttpErrorName, HttpStatusCode } from '../constants/httpResponse';


export class ValidatorMiddleware {
    private invalidFields: string[] = []
    private errorMessages: string[] = []
    private readonly error: IError = {
        name: HttpErrorName.BAD_REQUEST,
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: ""
    }

    constructor(private readonly sanityOptions: SanityOptions = { sanitizeRequest: false, silentProcess: false }) { }

    validate<T>(req: Request, res: Response, next: NextFunction, routeValidations: IValidation<T>): void {
        this.clearErrors()
        for (const [key, { required, validations }] of Object.entries<MethodValidation>(routeValidations)) {
            this.checkRequiredProps(key, required, req)
            if (req.body[key]) this.runValidations(req.body[key], validations)
        }
        if (this.errorMessages.length > 0) {
            this.error.message = this.errorMessages.join(",\n")
            next(this.error)
        }
        if (this.sanityOptions.sanitizeRequest) {
            this.sanitizeRequestBody<T>(req, routeValidations)
        }
        if (this.invalidFields.length > 0 && !this.sanityOptions.silentProcess) {
            this.error.message = `Request Body has Invalid Field(s): [${this.invalidFields.join(", ")}]`
            next(this.error)
        }
        next()
    }

    private requestBodyFilter(key: string, allowedFields: string[]): boolean {
        if (allowedFields.includes(key)) {
            return true
        } else {
            this.invalidFields.push(key)
            return false
        }
    }

    private sanitizeRequestBody<T>(req: Request, routeValidations: IValidation<T>): void {
        const allowedFields = Object.keys(routeValidations)
        req.body = Object.keys(req.body as Record<string, unknown>)
            .filter(key => this.requestBodyFilter(key, allowedFields))
            .reduce((obj: Record<string, unknown>, key) => {
                obj[key] = req.body[key];
                return obj;
            }, {});
    }

    private clearErrors(): void {
        this.error.message = ""
        this.errorMessages = []
        this.invalidFields = []
    }

    private checkRequiredProps(key: string, { value, errMessage }: MethodValidation["required"], req: Request): void {
        if (value) {
            const isKeyExists = this.isAttributeInReqBody(req, key)
            if (!isKeyExists) {
                this.errorMessages.push(errMessage)
            }
        }
    }

    private isAttributeInReqBody(req: Request, attrib: string): boolean {
        return req.body[attrib] !== undefined
    }

    private runValidations(value: any, { enum: propEnum, regex, string, }: MethodValidation["validations"]): void {
        if (regex) {
            this.runRegexValidations(value, regex)
        }
        if (string) {
            this.runStringValidations(value, string)
        }
        if (propEnum) {
            this.runEnumValidations(value, propEnum)
        }
    }

    private runRegexValidations(value: any, regexValidations: Record<string, IRegexValidation>): void {
        Object.values(regexValidations).forEach((validation => {
            const isValid = this.regexValidator(value as string, validation.regex)
            if (!isValid) this.errorMessages.push(validation.errMessage)
        }))
    }

    private runStringValidations(value: any, stringValidations: Record<string, IStringValidation>): void {
        Object.values(stringValidations).forEach((validation => {
            const isValid = this.stringValidator(value as string, validation.test)
            if (!isValid) this.errorMessages.push(validation.errMessage)
        }))
    }

    private runEnumValidations(value: any, enumValidations: Record<string, IEnumValidation>): void {
        Object.values(enumValidations).forEach((validation => {
            const isValid = this.enumValidator(value as string | number, validation.test, validation.ref)
            if (!isValid) this.errorMessages.push(validation.errMessage)
        }))
    }

    private regexValidator(string: string, regex: IRegexValidation["regex"]): boolean { return regex.test(string) }

    private stringValidator(password: string, test: IStringValidation["test"]): boolean { return test(password) }

    private enumValidator(value: string | number, test: IEnumValidation["test"], ref: Array<string | number>): boolean { return test(value, ref) }
}

