import { type Router, type Request, type Response, type NextFunction } from "express";
import { type AuthService } from "./auth.service";
import { type IRouter } from "../../types/router";
import { type AuthDto } from "./auth.dto";
import { type IError } from "../../middlewares/errorHandler.middleware";
import { type UserDto } from "../user/user.dto";

export class AuthController implements IRouter {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.router.post("/login", (req, res, next) => {
      this.loginHandler(req, res, next)
    });
    this.router.post("/register", (req, res, next) => {
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
        message: "Please provide Valid Credentials",
        name: "Bad Request",
        statusCode: 400
      }
      next(error)
    }
  }

  private registerUser(req: Request, res: Response, next: NextFunction): void {
    const response = this.authService.register(req.body as UserDto);
    response
      .then((user) => res.status(201).json(user))
      .catch((errorMessage) => {
        const error: IError = {
          message: errorMessage,
          name: "Internal Server Error",
          statusCode: 500
        }
        next(error);
      });
  }

  getRouter(): Router {
    return this.router;
  }
}
