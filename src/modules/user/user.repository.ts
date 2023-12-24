import { type Pool } from "pg";
import { type UserDto } from "./user.dto";

export class UserRepository {
  constructor(private readonly pool: Pool) { }

  async getUserByEmail(email: string): Promise<UserDto> {
    const query = {
      text: "SELECT * FROM Public.user WHERE email = $1",
      values: [email]
    };
    const users = (await this.pool.query<UserDto>(query)).rows;
    return users[0];
  }

  async getUserById(id: number): Promise<UserDto> {
    const query = {
      text: "SELECT * FROM Public.user WHERE id = $1",
      values: [id]
    };
    const users = (await this.pool.query<UserDto>(query)).rows;
    return users[0];
  }

  async deleteUser(id: number): Promise<void> {
    const foundUser = await this.getUserById(id);
    if (!foundUser) throw new Error("User is not found");
    const query = {
      text: 'UPDATE public.user SET "deletedAt" = $1 where id = $2',
      values: [new Date().toISOString(), foundUser.id]
    };
    await this.pool.query(query);
  }
}
