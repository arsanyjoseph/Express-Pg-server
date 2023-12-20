import { removePasswordFromUserEntity } from "../../utils/removePasswordFromResponse";
import { type UserDto } from "./user.dto";
import { type UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async register(user: UserDto): Promise<Omit<UserDto, "password">> {
    const newUser = await this.userRepository.createUser(user);
    return removePasswordFromUserEntity(newUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
