import { removePasswordFromUser } from "../../utils/removePasswordFromUser";
import { type UserDto } from "./user.dto";
import { type UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  async getUser(id: number): Promise<Omit<UserDto, "password">> {
    const user = await this.userRepository.getUserById(id)
    return removePasswordFromUser(user);
  }
}
