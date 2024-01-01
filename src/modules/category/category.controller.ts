import { type Router, type NextFunction, type Response, type Request } from "express";
import { type CategoryService } from "./category.service";
import { type CategoryDto } from "./category.dto";
import { type IError } from "../../middlewares/errorHandler.middleware";
import { HttpErrorMessage, HttpErrorName, HttpStatusCode } from "../../constants/httpResponse";
import { type CustomRequest } from "../../types/request";
import { type ValidatorMiddleware } from "../../middlewares/validator.middleware";
import { createCategoryValidation } from "./validations/createCategory.validation";
import { roleGuardMiddleware } from "../../middlewares/roleGuard.middleware";
import { UserRoles } from "../../types/userRoles";
import { updateCategoryValidation } from "./validations/updateCategory.validation";
import { Controller } from "../common/controller";

export class CategoryController extends Controller {
    constructor(
        router: Router,
        private readonly categoryService: CategoryService,
        validator: ValidatorMiddleware
    ) {
        super(router, validator)
        this.registerRoutes()
    }

    registerRoutes(): void {

        this.router.get("/:category", (req, res, next): void => { this.getCategoryByName(req, res, next) })
        this.router.get("/user/:userId", (req, res, next): void => { this.getCategoryByUserId(req, res, next) })

        this.router.post("/", (req, res, next) => {
            this.validator.validate(req, res, next, createCategoryValidation)
        }, (req, res, next): void => { this.createCategory(req, res, next) })

        this.router.put("/", (req, res, next) => {
            this.validator.validate(req, res, next, updateCategoryValidation)
        }, (req, res, next) => { this.updateCategory(req, res, next) })

        this.router.delete("/:id", (req, res, next) => { roleGuardMiddleware(req, res, next, UserRoles.ADMIN) }, (req, res, next) => { this.deleteCategory(req, res, next) })
    }

    private getCategoryByName(req: Request, res: Response, next: NextFunction): void {
        const { category } = req.params;
        if (category) {
            const categoryPromise = this.categoryService.getCategoryByName(category)
            categoryPromise.then((category) => res.status(200).json(category)).catch((errorMessage) => {
                const error: IError = {
                    message: errorMessage,
                    name: HttpErrorName.NOT_FOUND,
                    statusCode: HttpStatusCode.NOT_FOUND
                }
                next(error);
            })
        } else {
            const error: IError = {
                message: HttpErrorMessage.BAD_REQUEST.MISSING_CREDS,
                name: HttpErrorName.BAD_REQUEST,
                statusCode: HttpStatusCode.BAD_REQUEST
            }
            next(error);
        }
    }

    private getCategoryByUserId(req: Request, res: Response, next: NextFunction): void {
        const { userId } = req.params;
        if (userId) {
            const categoryPromise = this.categoryService.getCategoryByUserId(parseInt(userId))
            categoryPromise.then((category) => res.status(200).json(category)).catch((errorMessage: Error) => {
                const error: IError = {
                    message: errorMessage.message,
                    name: HttpErrorName.BAD_REQUEST,
                    statusCode: HttpStatusCode.BAD_REQUEST
                }
                next(error);
            })
        }
    }

    private createCategory(req: CustomRequest, res: Response, next: NextFunction): void {
        if (req.user) {
            const newCategory: CategoryDto = { userId: req.user.id, ...req.body }
            const categoryPromise = this.categoryService.createCateogry(newCategory)
            categoryPromise.then((category) => res.status(200).json(category)).catch((errorMessage: Error) => {
                const error: IError = {
                    message: errorMessage.message,
                    name: HttpErrorName.SERVER_ERROR,
                    statusCode: HttpStatusCode.SERVER_ERROR
                }
                next(error);
            })
        }
    }

    private updateCategory(req: CustomRequest, res: Response, next: NextFunction): void {
        const categoryPromise = this.categoryService.updateCategory(req.body as CategoryDto)
        categoryPromise.then((category) => res.status(200).json(category)).catch((errorMessage: Error) => {
            const error: IError = {
                message: errorMessage.message,
                name: HttpErrorName.SERVER_ERROR,
                statusCode: HttpStatusCode.SERVER_ERROR
            }
            next(error);
        })
    }

    private deleteCategory(req: CustomRequest, res: Response, next: NextFunction): void {
        const { id } = req.params
        if (id) {
            const promise = this.categoryService.deleteCategory(parseInt(id))
            promise.then(() => res.status(204).json()).catch((errorMessage: Error) => {
                const error: IError = {
                    message: errorMessage.message,
                    name: HttpErrorName.SERVER_ERROR,
                    statusCode: HttpStatusCode.SERVER_ERROR
                }
                next(error);
            })
        } else {
            const error: IError = {
                message: HttpErrorMessage.BAD_REQUEST.MISSING_CREDS,
                name: HttpErrorName.BAD_REQUEST,
                statusCode: HttpStatusCode.BAD_REQUEST
            }
            next(error);
        }
    }
}