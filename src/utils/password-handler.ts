import { hash, genSalt, compare } from "bcrypt";

const generateSalt = async (): Promise<string> => {
  return await genSalt(10);
};

const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await generateSalt();
  const hashedPassword = await hash(plainPassword, salt);
  return hashedPassword;
}
  ;
const validatePassword = async (plainPassword: string, hash: string): Promise<boolean> => {
  return await compare(plainPassword, hash);
};

const passwordHandler = {
  generateSalt,
  hashPassword,
  validatePassword
};
export default passwordHandler;
