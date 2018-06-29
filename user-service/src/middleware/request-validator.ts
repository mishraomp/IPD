import { Request, Response } from "express";
import { IValidatableObject } from "./interfaces/i-validatable-object";

export class RequestValidator {
  public static async validate<T extends IValidatableObject>(type: any, req: Request, res: Response): Promise<T | void> {
    const validatableModel: T = Object.assign(new type(), req.body);
    const validationErrors: any[] = await validatableModel.validate();
    if (validationErrors && validationErrors.length > 0) {
      const responseJson = {
        code: 400,
        status: "ERROR",
        message: "Validation Error Occurred.",
        data: validationErrors
      };
      res.status(400).json(responseJson);
    } else {
      return validatableModel;
    }
  }
}
