import { hash, genSalt } from "bcrypt";

const generateSalt = async (): Promise<string> => {
  return await genSalt(10);
};

const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await generateSalt();
  const hashedPassword = await hash(plainPassword, salt);
  return hashedPassword;
};

const passwordHandler = {
  generateSalt,
  hashPassword
};
export default passwordHandler;
