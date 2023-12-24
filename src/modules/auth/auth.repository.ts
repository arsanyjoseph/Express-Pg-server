import { type Pool } from "pg";
import { type UserDto } from "../user/user.dto";
import { type UserRepository } from "../user/user.repository";
import { type AuthDto } from "./auth.dto";
import passwordHandler from "../../utils/passwordHandler";
import { UserRoles } from "../../types/userRoles";
import { HttpErrorMessage } from "../../constants/http";
import { InsertQueryBuilder } from "../../db/queries/queryBuilders";

export class AuthRepository {
  constructor(private readonly pool: Pool, private readonly userRepository: UserRepository) { }
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
    const hashedPassword = await passwordHandler.hashPassword(password);
    const query = {
      // text: 'INSERT INTO public.user ("firstName", "lastName", email, password, role, "createdAt", "updatedAt", "isActive", "deletedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      text: InsertQueryBuilder("user", ["firstName", "lastName", "email", "password", "role", "createdAt", "updatedAt", "isActive", "deletedAt"], ["$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9"], ["*"]),
      values: [
        firstName,
        lastName,
        email,
        hashedPassword,
        UserRoles.STUDENT,
        new Date().toISOString(),
        new Date().toISOString(),
        true,
        null
      ]
    };
    try {
      const newUser = await this.pool.query<UserDto>(query);
      return newUser.rows[0];
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
