import { type Pool } from "pg";
import { type UserDto } from "../user/user.dto";
import { type UserRepository } from "../user/user.repository";
import { type AuthDto } from "./auth.dto";
import passwordHandler from "../../utils/passwordHandler";
import { UserRoles } from "../../types/userRoles";
import { HttpErrorMessage } from "../../constants/http";
import { type IInsert, InsertQueryBuilder } from "../../db/queries/queryBuilders";
import { UserEntity } from "../user/user.entity";

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
    const queryParams: IInsert = {
      tableName: "user",
      insertedColumns: [
        { columnName: UserEntity.FIRST_NAME, value: "$1" },
        { columnName: UserEntity.LAST_NAME, value: "$2" },
        { columnName: UserEntity.EMAIL, value: "$3" },
        { columnName: UserEntity.PASSWORD, value: "$4" },
        { columnName: UserEntity.ROLE, value: "$5" },
        { columnName: UserEntity.CREATED_AT, value: "$6" },
        { columnName: UserEntity.UPDATED_AT, value: "$7" },
        { columnName: UserEntity.IS_ACTIVE, value: "$8" },
        { columnName: UserEntity.DELETED_AT, value: "$9" }],
      returnColumns: ["*"]
    }
    const query = {
      text: InsertQueryBuilder(queryParams),
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
