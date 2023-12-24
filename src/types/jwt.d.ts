import { type JwtPayload } from "jsonwebtoken"
import { type UserRoles } from "./userRoles"

export interface IJwtPayload extends JwtPayload {
    id: number
    email: string
    role: UserRoles
}