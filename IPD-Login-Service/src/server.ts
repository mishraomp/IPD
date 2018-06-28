import { Config } from "./config/config";
import { App } from "./config/app";

export class Server {
  public static start(): App {
    const newServer: Server = new Server();
    return newServer.app;
  }
  public app: App;

  constructor() {
    this.app = new App();

    const webServer = this.app.webFramework.listen(this.app.webFramework.get("port"), () => {
      if (Config.get("NODE_ENV") === "local") {
        console.log(`Login Service is running at http://localhost:${this.app.webFramework.get("port")} .`);
        console.log(`Press CTRL-C to stop\n`);
      } else {
        console.info(`Login Service is running at http://localhost:${this.app.webFramework.get("port")} .`);
      }
    });
  }

}

export const server = Server.start();
