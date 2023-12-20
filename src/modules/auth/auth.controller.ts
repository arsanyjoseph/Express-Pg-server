import { type Router } from "express";
import { type AuthService } from "./auth.service";
import { type IRouter } from "../../types/router";
import { type AuthDto } from "./auth.dto";

export class AuthController implements IRouter {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.loginHandler();
  }

  private loginHandler(): void {
    this.router.post("/login", (req, res): void => {
      this.authService
        .login(req.body as AuthDto)
        .then((response) => res.status(200).json(response))
        .catch((error) => {
          throw new Error(error as string);
        });
    });
  }

  getRouter(): Router {
    return this.router;
  }
}
