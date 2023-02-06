import bcrypt from 'bcryptjs';

export const passwordEncrypting = (password: string) => {
  const salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt);
};
export const passwordValidate = async (password: string, hashPassword: string) => {
  const valid = await bcrypt.compare(password, hashPassword);
  return valid;
};
