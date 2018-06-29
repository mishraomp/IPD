import * as express from "express";
import { UserService } from "./service/user-service";

export const router = express.Router();
router.post("/api/v1/user-service/login", UserService.login);
