import { type UserDto } from "./user.dto";
import { HttpErrorMessage } from "../../constants/http";
import { type PoolWrapper } from "../../db/PoolWrapper/PoolWrapper";
import { UserEntity } from "./user.entity";

export class UserRepository {
  constructor(private readonly poolWrapper: PoolWrapper) { }

  async getUserByEmail(email: string): Promise<UserDto> {
    const user = await this.poolWrapper.findOne<UserDto>("*", { email })
    return user;
  }

  async getUserById(id: number): Promise<UserDto> {
    const user = await this.poolWrapper.findOne<UserDto>("*", { id })
    return user;
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    const users = await this.poolWrapper.create<UserDto>(userDto)
    return users[0]
  }

  async updateUserProfile({ id, firstName, lastName, isActive, }: UserDto): Promise<UserDto> {
    const user = await this.getUserById(id)
    if (!user) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND)

    const updatedColumns = {
      [UserEntity.FIRST_NAME]: firstName ?? user.firstName,
      [UserEntity.LAST_NAME]: lastName ?? user.lastName,
      [UserEntity.IS_ACTIVE]: isActive ?? user.isActive,
      [UserEntity.UPDATED_AT]: new Date().toISOString()
    }
    const users = await this.poolWrapper.updateEntity<UserDto>(updatedColumns, { id })
    if (!users) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND)
    return users[0];
  }

  async deleteUser(id: number): Promise<void> {
    const foundUser = await this.getUserById(id);
    if (!foundUser) throw new Error(HttpErrorMessage.UNAUTHORIZED.USER_NOT_FOUND);

    const updatedColumn = {
      [UserEntity.DELETED_AT]: new Date().toISOString()
    }

    await this.poolWrapper.updateEntity<UserDto>(updatedColumn, { id });
  }
}
