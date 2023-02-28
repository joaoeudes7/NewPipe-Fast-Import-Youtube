import { Request, Response, Router } from "express";

import { container } from "tsyringe";

import { GenerateOAuthUrlUseCase } from "../../domains/youtube/useCases/auth/GenerateOAuthUrlUseCase";
import { GetTokenOAuthUseCase } from "../../domains/youtube/useCases/auth/GetTokenOAuthUseCase";
import { GetSubscriptionsYotubeNewPipeUseCase } from "../../domains/youtube/useCases/youtube/GetSubscriptionsYotuubeNewPipeUseCase";

import { createStreamJson } from "../../utils/Stream";
import { ControllerBase } from "../base/ControllerBase";

export class YoutubeController extends ControllerBase {
  
  constructor() {
    super("/youtube");

    this.router.get("/", (req, res) => {
      res.send("Hello World");
    });

    this.router.get("/auth", async (req, res) => {
      const generateOAuthUrlUseCase = container.resolve(GenerateOAuthUrlUseCase);
    
      const url = await generateOAuthUrlUseCase.execute();
    
      res.redirect(url);
    });
    
    this.router.get("/oauth2callback", async (req, res) => {
      const code = req.query.code as string;
    
      const getTokenOAuthUseCase = container.resolve(GetTokenOAuthUseCase);
    
      if (code) {
        const { access_token } = await getTokenOAuthUseCase.execute(code);
    
    
        res.redirect(`${this.endpoint}/export-subscribes?access_token=${access_token}`);
      } else {
        res.status(400).send("Error");
      }
    });
    
    this.router.get("/export-subscribes", async (req, res) => {
      const accessToken = req.query.access_token as string;

      const download = req.query.download as string || req.session.download as string;
      const redirect = req.query.redirect as string || req.session.redirect as string;

      // Save params to back to this route
      req.session.download = download;
      req.session.redirect = redirect;
    
      if (!accessToken) {
        return res.redirect(`${this.endpoint}/auth`);
      } 

      const exportSubscriptionsToNewPipeUseCase = container.resolve(
        GetSubscriptionsYotubeNewPipeUseCase
      );
    
      const subscriptions = await exportSubscriptionsToNewPipeUseCase.execute({
        accessToken,
      });
    
      const contentFileNewPipeJson = {
        app_version: "0.24.1", // Optional
        app_version_int: 991, // Optional
        subscriptions: subscriptions,
      };
    
      if (download === "true") {
        const jsonStream = createStreamJson(contentFileNewPipeJson);
    
        res.set(
          "Content-disposition",
          "attachment; filename=NewPipeSubscriptions.json"
        );
    
        res.set("Content-Type", "application/json");
    
        // Send command to download file
        jsonStream.pipe(res);
      } else if (redirect) {
        res.redirect(redirect + JSON.stringify(contentFileNewPipeJson));
      } else {
        res.json(contentFileNewPipeJson);
      }
    });
  }
}
