import { AxiosResponse } from 'axios';
import $api from '../http';
import { IUserFront } from '../../common/types/user.types';

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUserFront[]>> {
    return $api.get<IUserFront[]>('/user/users');
  }
}
