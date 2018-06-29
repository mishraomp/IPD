import "reflect-metadata";
import { Container } from "inversify";
import { IUserController } from "../controller/i-user-controller";
import { UserController } from "../controller/user-controller";

export const iocContainer = new Container();
iocContainer.bind<IUserController>("IUserController").to(UserController);
