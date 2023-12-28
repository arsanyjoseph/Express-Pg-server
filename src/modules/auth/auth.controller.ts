import { type Router, type Request, type Response, type NextFunction } from "express";
import { type AuthService } from "./auth.service";
import { type IRouter } from "../../types/router";
import { type AuthDto } from "./auth.dto";
import { type IError } from "../../middlewares/errorHandler.middleware";
import { type UserDto } from "../user/user.dto";
import { HttpErrorMessage, HttpErrorName, HttpStatusCode } from "../../constants/httpResponse";
import { registerValidation } from "./validations/register/register.validation";
import { loginValidation } from "./validations/login/login.validation";
import { type ValidatorMiddleware } from "../../middlewares/validator.middleware";

export class AuthController implements IRouter {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly validator: ValidatorMiddleware 
  ) {
    this.registerRoutes()
  }

  private registerRoutes(): void {
    this.router.post("/login", (req, res, next) => {

      this.validator.validate(req, res, next, loginValidation)
    }, (req, res, next) => {
      this.loginHandler(req, res, next)
    });
    this.router.post("/register", (req, res, next) => {
      this.validator.validate(req, res, next, registerValidation)
    }, (req, res, next) => {
      this.registerUser(req, res, next)
    });
  }

  private loginHandler(req: Request, res: Response, next: NextFunction): void {
    if (req.body?.email && req.body?.password) {
      this.authService
        .login(req.body as AuthDto)
        .then((accessToken) => res.status(200).json({ accessToken }))
        .catch((error) => {
          next(error);
        });
    } else {
      const error: IError = {
        message: HttpErrorMessage.BAD_REQUEST.INVALID_CREDS,
        name: HttpErrorName.BAD_REQUEST,
        statusCode: HttpStatusCode.BAD_REQUEST
      }
      next(error)
    }
  }

  private registerUser(req: Request, res: Response, next: NextFunction): void {
    const response = this.authService.register(req.body as UserDto);
    response
      .then((user) => res.status(201).json(user))
      .catch((err) => {
        const error: IError = {
          message: (err as Error).message,
          name: HttpErrorName.SERVER_ERROR,
          statusCode: HttpStatusCode.SERVER_ERROR
        }
        next(error);
      });
  }

  getRouter(): Router {
    return this.router;
  }
}
