import * as swaggerUi from "swagger-ui-express";
import { Config } from "./config";
import * as express from "express";
import { Router } from "./router";

export class App {
  public static async handleJSONParsingErrors(err: any, req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (null === req || undefined === req) {
        return reject(new ReferenceError("req is null or undefined."));
      }

      if (null === res || undefined === res) {
        return reject(new ReferenceError("res is null or undefined."));
      }

      if (null === next || undefined === next) {
        return reject(new ReferenceError("next is null or undefined."));
      }

      if (err) {
        let errorMessage: string = "";

        if (err instanceof SyntaxError) {
          errorMessage = "The JSON provided is malformed and cannot be processed.";
        } else if (err.hasOwnProperty("type") && err.type === "entity.too.large") {
          errorMessage = "The JSON provided is is too large and cannot be processed.";
        } else {
          return reject(err);
        }

        const responseJson = {
          error: errorMessage
        };

        res.status(400).json(responseJson);
      }
      return resolve();
    }).then(() => next());
  }

  public static async catchNotFoundError(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!req) {
        return reject(new ReferenceError("req is null or undefined."));
      }

      if (!res) {
        return reject(new ReferenceError("res is null or undefined."));
      }

      if (!next) {
        return reject(new ReferenceError("next is null or undefined."));
      }

      res.status(404);
      return resolve();
    });
  }

  public static async handleError(err: any, req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!req) {
        return reject(new ReferenceError("req is null or undefined."));
      }

      if (!res) {
        return reject(new ReferenceError("res is null or undefined."));
      }

      if (!next) {
        return reject(new ReferenceError("next is null or undefined."));
      }

      const env: string = Config.get("NODE_ENV");

      res.status(500);

      switch (env) {
        case "local":
          {
            res.json(err.stack);
            break;
          }
        default:
          {
            res.send("Internal Server Error");
            break;
          }
      }
      return resolve();
    });
  }
  public webFramework: express.Application;

  constructor() {
    // Establish the web-framework
    this.webFramework = express();

    // Express configuration
    this.webFramework.set("port", Config.get("server_port"));

    // Set static paths
    const swaggerDocument = require("../swagger.json");
    this.webFramework.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI

    // Setup pre-routed error-handling
    this.webFramework.use(App.handleJSONParsingErrors); // JSON formatting error handling

    // Set route mappings
    this.webFramework.use(Router);

    // Catch 404 and forward to error handler
    // This should always be done last in the application stack
    this.webFramework.use(App.catchNotFoundError);
    this.webFramework.use(App.handleError);
  }
}
