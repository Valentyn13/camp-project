import { IUserFront } from './user.types';

export interface IAuthResponse {
  acccesToken: string;
  refreshToken: string;
  user: IUserFront;
}
