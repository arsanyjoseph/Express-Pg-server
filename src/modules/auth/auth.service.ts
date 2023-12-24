import { type AuthRepository } from "./auth.repository";
import { type AuthDto } from "./auth.dto";
import passwordHandler from "../../utils/passwordHandler";
import { signToken } from "../../utils/jwt";
import { type UserDto } from "../user/user.dto";
import { removePasswordFromUser } from "../../utils/removePasswordFromUser";
import { HttpErrorMessage } from "../../constants/http";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) { }

  async login(authDto: AuthDto): Promise<string> {
    const user = await this.authRepository.login(authDto)
    const isValid = await passwordHandler.validatePassword(authDto.password, user.password)
    if (!isValid) throw new Error(HttpErrorMessage.BAD_REQUEST.INVALID_CREDS)
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    return token
  }

  async register(user: UserDto): Promise<Omit<UserDto, "password">> {
    const newUser = await this.authRepository.createUser(user);
    return removePasswordFromUser(newUser);
  }
}
