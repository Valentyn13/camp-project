import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Token from '../models/tokenModel';

dotenv.config();

export default class TokenServices {
  async createToken(payload: any) {
    const accesToken = jwt.sign(payload, 'JWT_ACCES_SECRET', {
      expiresIn: '1h'
    });
    const refreshToken = jwt.sign(payload, 'JWT_REFRESH_SECRET', {
      expiresIn: '30d'
    });
    return {
      accesToken,
      refreshToken
    };
  }

  async saveToken(userID: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userID });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userID, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async validateAccesToken(token: string) {
    const userData = jwt.verify(token, 'JWT_ACCES_SECRET');
    if (!userData) {
      return null;
    }
    return userData;
  }

  async validateRefreshToken(token: string) {
    const userData = jwt.verify(token, 'JWT_REFRESH_SECRET');
    if (!userData) {
      return null;
    }
    return userData;
  }

  async findToken(refreshToken: string) {
    const tokenData = Token.findOne({ refreshToken });
    return tokenData;
  }
}

export const TokenService = new TokenServices();
