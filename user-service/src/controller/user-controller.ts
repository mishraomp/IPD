import { UserModel } from "../model/user-model";
import { LoggerConfig } from "../config/logger-config";
import { Controller, Route, Post, Body } from "tsoa";

@Route("/api/v1/user-service/login")
export class UserController extends Controller {
  @Post()
  public async login (@Body() user: UserModel): Promise < any > {
    new LoggerConfig().appLogger.info(user);
    return { code: 200, message: "true" };
  }

}
