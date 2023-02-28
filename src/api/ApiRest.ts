import express from "express";

import dotenv from "dotenv";

import Session from "express-session";
import compression from "compression";
import bodyParser from "body-parser";

import { YoutubeController } from "./controllers/Youtube";
import { ControllerBase } from "./base/ControllerBase";

export class ApiRest {
  server = express();

  static start() {
    return new ApiRest().start();
  }

  constructor(
    private port: number = Number(process.env.PORT) || 3000,
    private host: string = process.env.HOST || "localhost"
  ) {
    dotenv.config();

    this.configurePlugins();
    this.setControllers([new YoutubeController()]);
  }

  protected async configurePlugins() {
    this.server.use(
      bodyParser.urlencoded({
        limit: "1mb",
        extended: true,
      })
    );

    this.server.use(
      bodyParser.json({
        limit: "10mb",
        type: "application/json",
      })
    );

    this.server.use(
      Session({
        secret: "NewPipeExport",
        resave: false,
        saveUninitialized: true,
      })
    );

    this.server.use(compression());
  }

  protected async setControllers(controllers: ControllerBase[]) {
    controllers.forEach((controller) => {
      this.server.use(controller.endpoint, controller.router);
    });
  }

  async start() {
    this.server.listen(this.port, () => {
      console.log(`Listening at http://${this.host}:${this.port}`);
    });
  }
}
