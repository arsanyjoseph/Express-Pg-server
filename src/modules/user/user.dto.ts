import { type UserRoles } from "../../types/userRoles";

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  deletedAt: string | null;
}
