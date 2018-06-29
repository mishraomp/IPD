export interface IValidatableObject {
  validate(): Promise<string[]>;
}
