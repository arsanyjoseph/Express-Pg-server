import { nullMethodValidation } from "../../../constants/nullMethodValidation";
import type { IValidation } from "../../../types/validation";
import type { UserDto } from "../user.dto";

export const updateProfileValidation: IValidation<UserDto> = {
    createdAt: nullMethodValidation,
    deletedAt: nullMethodValidation,
    updatedAt: nullMethodValidation,
    role: nullMethodValidation,
    email: nullMethodValidation,
    firstName: nullMethodValidation,
    isActive: nullMethodValidation,
    id: nullMethodValidation,
    lastName: nullMethodValidation,
    password: nullMethodValidation,
}