import { LoggerConfig } from "../config/logger-config";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../model/user-model";
import { RequestValidator } from "../middleware/request-validator";
import { iocContainer } from "../config/ioc";
import { IUserController } from "../controller/i-user-controller";
export class UserService {
  public static async login(request: Request, response: Response): Promise<void> {
    new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
    const userModel: UserModel = await RequestValidator.validate(UserModel, request, response) as UserModel;
    if (userModel) {
      const controller: IUserController = iocContainer.get<IUserController>("IUserController");
      return controller.login(userModel);
    }
    new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
  }
}
