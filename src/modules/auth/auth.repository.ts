import { type Pool } from "pg";
import { type UserDto } from "../user/user.dto";
import { type UserRepository } from "../user/user.repository";
import { type AuthDto } from "./auth.dto";

export class AuthRepository {
  constructor(private readonly pool: Pool, private readonly userRepository: UserRepository) { }
  async login({ email, password }: AuthDto): Promise<UserDto> {
    const foundUsers = await this.userRepository.getUserByEmail(email)
    if (foundUsers.length === 0) throw new Error("User is not found")
    const user = foundUsers[0]
    return user
  }
}
