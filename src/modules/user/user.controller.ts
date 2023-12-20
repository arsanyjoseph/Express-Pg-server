import { type Router } from "express";
import { type UserService } from "./user.service";
import { type IRouter } from "../../types/router";
import { type UserDto } from "./user.dto";

export class UserController implements IRouter {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    this.router.post("/register", (req, res) => {
      const response = this.userService.register(req.body as UserDto);
      response
        .then((user) => res.status(201).json(user))
        .catch((error) => {
          throw new Error(error as string);
        });
    });
    this.router.delete("/:id", (req, res): void => {
      const { id } = req.params
      this.userService.deleteUser(parseInt(id)).then(() => { res.status(204) }).catch((error) => { throw new Error(error as string) })
    })
  }

  getRouter(): Router {
    return this.router;
  }
}
