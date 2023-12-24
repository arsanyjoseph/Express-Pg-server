import { type Request } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { type UserRoles } from "../types/userRoles"

export interface IJwtPayload extends JwtPayload {
    id: number
    email: string
    role: UserRoles
}

const signToken = (payload: IJwtPayload): string => {
    const secret = process.env.JWT_SECRET as unknown as string
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

const verifyToken = (token?: string, secret?: string): JwtPayload | string => {
    if (!secret || !token) throw new Error("Error while parsing token")
    return jwt.verify(token, secret)
}

const extractTokenFromHeaders = (req: Request): string | undefined => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1];
    if (!token) throw new Error("No Token Provided")
    return token
}

export { signToken, verifyToken, extractTokenFromHeaders }