import { IValidatableObject } from "../middleware/interfaces/i-validatable-object";

export class UserModel implements IValidatableObject {

  private userName: string;
  private pwd: string;
  private token: string;
  public validate(): Promise<string[]> {
    return Promise.resolve([]);
  }
}
