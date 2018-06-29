import { UserModel } from "../model/user-model";

export interface IUserController {
  login(user: UserModel): Promise<any>;
}
