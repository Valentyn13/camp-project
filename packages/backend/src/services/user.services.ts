import dotenv from 'dotenv';
import { v4 } from 'uuid';
import Role from '../models/Roles';
import UserDto from '../utils/user.dto.util';
import MyUser, { IUser } from '../models/User';
import { MyCustomError } from '../middlewares/error.middleware';
import { passwordEncrypting, passwordValidate } from '../utils/password.util';
import { MailService } from './mail.sercive';
import { TokenService } from './token.service';

dotenv.config();

export default class UserServices {
  async register(newUser: IUser) {
    const { username, password, email } = newUser;

    const candidate = await MyUser.findOne({ email });
    if (candidate) {
      throw new MyCustomError(500, 'user already exist, change username!');
    }
    const hashPassword = passwordEncrypting(password);
    const userRole = await Role.findOne({ value: 'USER' });
    const activationLink = v4();
    const registeredUser = await MyUser.create({
      username,
      password: hashPassword,
      email,
      activationLink,
      roles: [userRole?.value]
    });
    await MailService.sendActivationEmail(email, activationLink);
    const userDto = new UserDto(registeredUser); // id email isActivated;
    const tokens = await TokenService.createToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async login(email: string, password: string) {
    const currentUser = await MyUser.findOne({ email });
    if (!currentUser) {
      throw new MyCustomError(500, 'User not found');
    }
    const validPassword = await passwordValidate(password, currentUser.password);
    if (!validPassword) {
      throw new MyCustomError(500, 'invalid password');
    }
    const userDto = new UserDto(currentUser);
    const tokens = await TokenService.createToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new MyCustomError(400, "Can't find refresh token, please authorize!");
    }
    const validateRefresh = await TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!validateRefresh || !tokenFromDb) {
      throw new MyCustomError(402, 'Unauthorized error');
    }
    if (typeof validateRefresh !== 'string') {
      const user = await MyUser.findById(validateRefresh.id);
      if (user) {
        const userDto = new UserDto(user);
        const tokens = await TokenService.createToken({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
          ...tokens,
          user: userDto
        };
      }
    }
  }

  async getUsers() {
    const users = MyUser.find((err, value) => {
      if (err) {
        throw new Error(err.message);
      }
      return value;
    });
    return users;
  }
}
