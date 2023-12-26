import type { Column } from "../../types/queries";
import { type UserRoles } from "../../types/userRoles";

export interface UserDto extends Column {
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
