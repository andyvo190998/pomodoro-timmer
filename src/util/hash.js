import { hash } from 'bcrypt';

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export default hashPassword;
