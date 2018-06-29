import * as express from "express";
import { asyncExpressFunction } from "../middleware/middleware";
import { UserService } from "../service/user-service";

export const Router = express.Router();
Router.post("/api/user-service/", asyncExpressFunction(async (req: express.Request, res: express.Response) => {
  const response = await UserService.login(req, res);
}));
