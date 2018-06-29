import { Config } from "./config/config";
import { App } from "./config/app";
import { LoggerConfig } from "./config/logger-config";

export class Server {

  public static start(): App {
    const newServer: Server = new Server();
    return newServer.app;
  }
  public app: App;

  constructor() {
    LoggerConfig.initializeLogger();
    this.app = new App();

    const webServer = this.app.application.listen(this.app.application.get("port"), () => {
      if (Config.get("NODE_ENV") === "local") {
        new LoggerConfig().appLogger.info(`Login Service is running at http://localhost:${this.app.application.get("port")} .`);
        new LoggerConfig().appLogger.info(`Press CTRL-C to stop\n`);
      } else {
        new LoggerConfig().appLogger.info(`Login Service is running at http://localhost:${this.app.application.get("port")} .`);
      }
    });
  }

}

export const server = Server.start();

const handleUncaughtException = (err: any) => {
  if (err.errno === "EADDRINUSE") {
    console.error("Port  is already being used. Have you started the same Node JS instance twice? Try a different HTTP_PORT.");
    setTimeout(() => {
      process.exit(1);
    }, 500);
  } else {
    console.error("There was an uncaught exception.", err);
  }
};

process.on("unhandledRejection", (reason: any, p: any) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

process.on("uncaughtException", handleUncaughtException);
