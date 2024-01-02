import type { Router, Request, Response, NextFunction } from "express";
import { type ValidatorMiddleware } from "../../middlewares/validator.middleware";
import { Controller } from "../common/controller";
import { type QuestionService } from "./question.service";
import { type IError } from "../../middlewares/errorHandler.middleware";
import { HttpErrorMessage, HttpErrorName, HttpStatusCode } from "../../constants/httpResponse";
import { type QuestionDto } from "./question.dto";
import { type CustomRequest } from "../../types/request";
import { type OmitId } from "../../types/utils";
import { createQuestionValidation } from "./validations/create/createQuestion.validation";

export class QuestionController extends Controller {
    constructor(
        router: Router,
        private readonly questionService: QuestionService,
        validator: ValidatorMiddleware
    ) {
        super(router, validator)
        this.registerRoutes()
    }

    registerRoutes(): void {

        this.router.get("/:id", (req, res, next) => { this.getQuestionById(req, res, next) })

        this.router.post("/", (req, res, next) => { this.validator.validate(req, res, next, createQuestionValidation) }, (req, res, next) => { this.createQuestion(req, res, next) })

    }

    getQuestionById(req: Request, res: Response, next: NextFunction): void {
        const { id } = req.params
        if (id) {
            const questionPromise = this.questionService.getQuestionById(parseInt(id))
            questionPromise.then((question) => res.status(200)
                .json(question)).catch((errorMessage: Error) => {
                    const error: IError = {
                        message: errorMessage.message,
                        name: HttpErrorName.SERVER_ERROR,
                        statusCode: HttpStatusCode.SERVER_ERROR
                    }
                    next(error)
                })
        } else {
            const error: IError = {
                message: HttpErrorMessage.BAD_REQUEST.MISSING_CREDS,
                name: HttpErrorName.BAD_REQUEST,
                statusCode: HttpStatusCode.BAD_REQUEST
            }
            next(error)

        }
    }

    createQuestion(req: CustomRequest, res: Response, next: NextFunction): void {
        if (req.user) {
            const { id: userId } = req.user
            const newQuestion: OmitId<QuestionDto> = { ...req.body, userId }
            const questionPromise = this.questionService.createQuestion(newQuestion)
            questionPromise.then((question) => res.status(201).json(question)).catch((errorMessage: Error) => {
                const error: IError = {
                    message: errorMessage.message,
                    name: HttpErrorName.SERVER_ERROR,
                    statusCode: HttpStatusCode.SERVER_ERROR
                };
                next(error)
            })
        }
    }
}