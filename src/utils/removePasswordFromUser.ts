import { type UserDto } from "../modules/user/user.dto";

export const removePasswordFromUser = (
  user: UserDto
): Omit<UserDto, "password"> => {
  const { password, ...plainUser } = user;
  return plainUser;
};
