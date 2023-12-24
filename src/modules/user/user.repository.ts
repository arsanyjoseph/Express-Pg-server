import { type Pool } from "pg";
import { type UserDto } from "./user.dto";
import { HttpErrorMessage } from "../../constants/http";
import { type ISelect, SelectQueryBuilder, UpdateQueryBuilder, type IUpdate } from "../../db/queries/queryBuilders";
import { UserEntity } from "./user.entity";

export class UserRepository {
  constructor(private readonly pool: Pool) { }

  async getUserByEmail(email: string): Promise<UserDto> {
    const queryParams: ISelect = { columnName: "*", tableName: "user", condition: "email = $1" }
    const query = {
      text: SelectQueryBuilder(queryParams),
      values: [email]
    };
    const users = (await this.pool.query<UserDto>(query)).rows;
    if (!users) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND)
    return users[0];
  }

  async getUserById(id: number): Promise<UserDto> {
    const queryParams: ISelect = { columnName: "*", tableName: "user", condition: "id = $1" }
    const query = {
      text: SelectQueryBuilder(queryParams),
      values: [id]
    };
    const users = (await this.pool.query<UserDto>(query)).rows;
    if (!users) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND)
    return users[0];
  }

  async updateUserProfile({ id, firstName, lastName, isActive, }: UserDto): Promise<UserDto> {
    const user = await this.getUserById(id)
    if (!user) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND)

    const updated = {
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
      isActive: isActive ?? user.isActive,
    }
    const queryParams: IUpdate = {
      tableName: "user",
      updatedColumns: [
        { columnName: UserEntity.FIRST_NAME, value: "$1" },
        { columnName: UserEntity.LAST_NAME, value: "$2" },
        { columnName: UserEntity.IS_ACTIVE, value: "$3" },
        { columnName: UserEntity.UPDATED_AT, value: "$4" }],
      condition: `${UserEntity.ID} = $5`,
      returnColumns: ["*"]
    }

    const query = {
      text: UpdateQueryBuilder(queryParams),
      values: [updated.firstName, updated.lastName, updated.isActive, new Date().toISOString(), id]
    };
    const users = (await this.pool.query<UserDto>(query)).rows;
    if (!users) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND)
    return users[0];
  }

  async deleteUser(id: number): Promise<void> {
    const foundUser = await this.getUserById(id);
    if (!foundUser) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND);
    const queryParams: IUpdate = {
      tableName: "user",
      updatedColumns: [{ columnName: UserEntity.DELETED_AT, value: "$1" }],
      condition: `${UserEntity.ID} = $2`,
    }
    const query = {
      text: UpdateQueryBuilder(queryParams),
      values: [new Date().toISOString(), foundUser.id]
    };
    await this.pool.query(query);
  }
}
