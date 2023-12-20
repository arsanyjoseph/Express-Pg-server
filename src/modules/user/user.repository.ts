import { type Pool } from "pg";
import { type UserDto } from "./user.dto";
import passwordHandler from "../../utils/password-handler";
import { UserRoles } from "../../types/userRoles";

export class UserRepository {
  constructor(private readonly pool: Pool) {}

  async getUserByEmail(email: string): Promise<UserDto[]> {
    const query = {
      text: "SELECT * FROM Public.user WHERE email = $1",
      values: [email]
    };
    const users = (await this.pool.query<UserDto>(query)).rows;
    return users;
  }

  async getUserById(id: number): Promise<UserDto[]> {
    const query = {
      text: "SELECT * FROM Public.user WHERE id = $1",
      values: [id]
    };
    const users = (await this.pool.query<UserDto>(query)).rows;
    return users;
  }

  async createUser(user: UserDto): Promise<UserDto> {
    const { email, firstName, lastName, password } = user;
    const foundUsers = await this.getUserByEmail(email);
    if (foundUsers.length > 0)
      throw new Error("This Email is already registered");
    const hashedPassword = await passwordHandler.hashPassword(password);
    const query = {
      text: 'INSERT INTO public.user ("firstName", "lastName", email, password, role, "createdAt", "updatedAt", "isActive", "deletedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
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

  async deleteUser(id: number): Promise<void> {
    const foundUsers = await this.getUserById(id);
    if (foundUsers.length === 0) throw new Error("User is not found");
    const user = foundUsers[0];
    const query = {
      text: 'UPDATE public.user SET "deletedAt" = $1 where id = $2',
      values: [new Date().toISOString(), user.id]
    };
    await this.pool.query(query);
  }
}
