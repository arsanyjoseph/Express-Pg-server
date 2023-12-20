import { type UserDto } from "../user/user.dto";
import { type AuthRepository } from "./auth.repository";
import { type AuthDto } from "./auth.dto";
import { removePasswordFromUserEntity } from "../../utils/removePasswordFromResponse";
import passwordHandler from "../../utils/password-handler";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) { }
  async login(authDto: AuthDto): Promise<Omit<UserDto, "password">> {
    const user = await this.authRepository.login(authDto)
    const isValid = await passwordHandler.validatePassword(authDto.password, user.password)
    if (!isValid) throw new Error("Incorrect Password")
    return removePasswordFromUserEntity(user)
  }
}
