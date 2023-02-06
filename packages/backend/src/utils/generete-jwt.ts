import jwt from 'jsonwebtoken';
import * as process from 'process';

interface IJwt {
  _id: string;
  username: string;
}
export const generateAccesToken = async (payload: IJwt) => {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  return {
    token: `Bearer ${jwtToken}`
  };
};
