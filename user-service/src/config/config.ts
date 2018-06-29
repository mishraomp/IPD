import * as nconf from "nconf";

try {
  // Read in Node environment variables
  nconf.env();

  const applicationConfigPath: string = "./dist/config/application.json";

  // Read application config values into nconf
  nconf.file(applicationConfigPath);
} catch (error) {
  throw error;
}

export class Config {
  public static get(key: string): any {
    return nconf.get(key);
  }
}
