import { LoggerConfig } from "../config/logger-config";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../model/user-model";
import { RequestValidator } from "../middleware/request-validator";
import { UserController } from "../controller/user-controller";
export class UserService {

  public static async login(request: Request, response: Response): Promise<void> {
    new LoggerConfig().reqRspLogger.info({ req: request }, "Request Recieved");
    const userModel: UserModel = await RequestValidator.validate(UserModel, request, response) as UserModel;
    if (userModel) {
      const controller: UserController = new UserController();
      const promise = controller.login(userModel);
      UserService.promiseHandler(promise, response);
    }
    new LoggerConfig().reqRspLogger.info({ res: response }, "Response Sent");
  }
  private static promiseHandler(promise: any, response: any): Promise<any> {
    return Promise.resolve(promise)
      .then((data: any) => {
        response.status(data.code).json(data);
      });
  }
}
