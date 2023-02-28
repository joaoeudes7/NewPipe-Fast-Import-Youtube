import { google } from "googleapis";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class GoogleSource {

  oAuth2Client = new google.auth.OAuth2({
    clientId: process.env.G_API_CLIENT_ID,
    clientSecret: process.env.G_API_CLIENT_SECRET,
    redirectUri: process.env.G_API_REDIRECT_URI,
  });

  youtubeClient = google.youtube({
    version: "v3",
  });

}
