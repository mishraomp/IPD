import { IValidatableObject } from "../middleware/interfaces/i-validatable-object";

export class UserModel implements IValidatableObject {

  public userName: string;
  public pwd: string;
  public token: string;
  public validate(): Promise<string[]> {
    return Promise.resolve([]);
  }
}
