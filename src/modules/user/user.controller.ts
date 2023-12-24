import { type Router, type NextFunction, type Response, type Request } from "express";
import { type UserService } from "./user.service";
import { type IRouter } from "../../types/router";
import { type IError } from "../../middlewares/errorHandler.middleware";
import { type CustomRequest } from "../../types/request";
import { HttpErrorMessage, HttpErrorName, HttpStatusCode } from "../../constants/http";
import { type UserDto } from "./user.dto";

export class UserController implements IRouter {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    this.router.delete("/:id", (req, res, next): void => {
      this.deleteUser(req, res, next)
    });
    this.router.get("/me", (req, res, next) => { this.getProfile(req, res, next) })
    this.router.put("/me", (req, res, next) => { this.updateProfile(req, res, next) })
  }

  getRouter(): Router {
    return this.router;
  }

  private getProfile(req: CustomRequest, res: Response, next: NextFunction): void {
    if (req.user) {
      this.userService.getUser(req.user.id).then((user) => res.status(200).json(user)).catch((errorMessage) => {
        const error: IError = {
          message: errorMessage,
          name: HttpErrorName.SERVER_ERROR,
          statusCode: HttpStatusCode.SERVER_ERROR
        }
        next(error);
      })
    } else {
      const error: IError = {
        message: HttpErrorMessage.UNAUTHORIZED.NO_TOKEN,
        name: HttpErrorName.UNAUTHORIZED,
        statusCode: HttpStatusCode.UNAUTHORIZED
      }
      next(error)
    }
  }

  private updateProfile(req: CustomRequest, res: Response, next: NextFunction): void {
    if (req.user) {
      const user: UserDto = {
        id: req.user.id,
        ...req.body
      }
      this.userService.updateUser(user).then((updatedUser) => res.status(200).json(updatedUser)).catch((errorMessage) => {
        const error: IError = {
          message: errorMessage,
          name: HttpErrorName.SERVER_ERROR,
          statusCode: HttpStatusCode.SERVER_ERROR
        }
        next(error);
      })
    } else {
      const error: IError = {
        message: HttpErrorMessage.UNAUTHORIZED.NO_TOKEN,
        name: HttpErrorName.UNAUTHORIZED,
        statusCode: HttpStatusCode.UNAUTHORIZED
      }
      next(error)
    }
  }

  private deleteUser(req: Request, res: Response, next: NextFunction): any {
    const { id } = req.params;
    this.userService
      .deleteUser(parseInt(id))
      .then(() => {
        res.status(204);
      })
      .catch((errorMessage) => {
        const error: IError = {
          message: errorMessage,
          name: "Internal Error",
          statusCode: 500
        }
        next(error);
      });
  }
}
