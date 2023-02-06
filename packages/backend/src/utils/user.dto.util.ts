import { IUser } from '../models/User';

export default class UserDto {
  email: string;

  id: string;

  isActivated: boolean;

  constructor(model: IUser) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
