import { autoInjectable } from "tsyringe";
import { GoogleSource } from "../sources/remote/GoogleSource";

@autoInjectable()
export class GoogleAuthRepository {
  constructor(private googleSource: GoogleSource) {}

  async generateOAuthUrl() {
    const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];

    const url = this.googleSource.oAuth2Client.generateAuthUrl({
      access_type: "offline",
      response_type: "code",
      scope: scopes,
    });

    return url;
  }

  async getCredentialOAuth(code: string) {
    const { tokens } = await this.googleSource.oAuth2Client.getToken(code);

    this.googleSource.oAuth2Client.setCredentials(tokens);

    return tokens;
  }
}
