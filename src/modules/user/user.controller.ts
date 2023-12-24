import { type Router, type NextFunction, type Response, type Request } from "express";
import { type UserService } from "./user.service";
import { type IRouter } from "../../types/router";
import { type IError } from "../../middlewares/errorHandler.middleware";

export class UserController implements IRouter {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    this.router.delete("/:id", (req, res, next): void => {
      this.deleteUser(req, res, next)
    });
    this.router.get("/profile", (req, res, next) => { this.getProfile(req, res, next) })
  }

  getRouter(): Router {
    return this.router;
  }

  private getProfile(req: Request, res: Response, next: NextFunction): void {
    res.json({ message: "auth" })
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
