import { IUserController } from "./i-user-controller";
import { UserModel } from "../model/user-model";
import { LoggerConfig } from "../config/logger-config";
import { Controller, Route, Post, Body } from "tsoa";

@Route("/api/user-service")
export class UserController extends Controller implements IUserController {
  @Post()
  public async login (@Body() user: UserModel): Promise < any > {
    new LoggerConfig().appLogger.info(user);
  }

}
