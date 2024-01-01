import { type UserDto } from "../user/user.dto";
import { type UserRepository } from "../user/user.repository";
import { type AuthDto } from "./auth.dto";
import { hashPassword } from "../../utils/passwordHandler";
import { UserRoles } from "../../types/userRoles";
import { HttpErrorMessage } from "../../constants/httpResponse";
import { UserEntity } from "../user/user.entity";
import { Repository } from "../common/repository";
import { type PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";

export class AuthRepository extends Repository {
  constructor(poolWrapper: PoolWrapper, private readonly userRepository: UserRepository) {
    super(poolWrapper)
  }

  async login({ email }: AuthDto): Promise<UserDto> {
    const foundUser = await this.userRepository.getUserByEmail(email)
    if (!foundUser) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND)
    return foundUser
  }

  async createUser(user: UserDto): Promise<UserDto> {
    const { email, firstName, lastName, password } = user;
    const foundUser = await this.userRepository.getUserByEmail(email);
    if (foundUser)
      throw new Error(HttpErrorMessage.SERVER_ERROR.DUPLICATE_CREDS);
    const hashedPassword = await hashPassword(password);
    const newUser: UserDto = {
      [UserEntity.ID]: 0,
      [UserEntity.FIRST_NAME]: firstName,
      [UserEntity.LAST_NAME]: lastName,
      [UserEntity.EMAIL]: email,
      [UserEntity.PASSWORD]: hashedPassword,
      [UserEntity.ROLE]: UserRoles.STUDENT,
      [UserEntity.CREATED_AT]: new Date().toISOString(),
      [UserEntity.UPDATED_AT]: new Date().toISOString(),
      [UserEntity.IS_ACTIVE]: true,
      [UserEntity.DELETED_AT]: null,
    }
    const createdUser = await this.userRepository.createUser(newUser)
    return createdUser
  }
}
