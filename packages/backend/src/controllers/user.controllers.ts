import { Request, Response } from 'express';
import { validateUserBody } from '../middlewares/userBody.validation';
import { MyCustomError } from '../middlewares/error.middleware';
import UserServices from '../services/user.services';
// import { generateAccesToken } from '../utils/generete-jwt';

export class UserController {
  constructor(private UserService: UserServices) {}

  async registerUser(req: Request, res: Response) {
    const { error } = validateUserBody(req.body);
    if (error) {
      throw new MyCustomError(400, 'Bad request body parameters');
    }
    const user = await this.UserService.register(req.body);
    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    // return generateAccesToken({ _id: user._id, username: user.username });
    return user;
  }

  async loginUser(req: Request, res: Response) {
    const { error } = validateUserBody(req.body);
    if (error) {
      throw new MyCustomError(400, 'Bad body parameters');
    }
    const { email, password } = req.body;
    const logUser = await this.UserService.login(email, password);
    res.cookie('refreshToken', logUser.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    return logUser;
    // return generateAccesToken({ _id: logUser._id, username: logUser.username });
  }

  async logoutUser(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const token = await this.UserService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return token;
  }

  async updateRefreshToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const user = await this.UserService.refresh(refreshToken);
    if (user) {
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return user;
    }
  }

  async getAllUsers() {
    const users = await this.UserService.getUsers();
    return users;
  }
}

const userController = new UserController(new UserServices());
export default userController;
