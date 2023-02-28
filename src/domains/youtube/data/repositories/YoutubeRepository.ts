import { autoInjectable } from "tsyringe";
import { SubscriptionChannel } from "../../models/SubscriptionChannel";
import { GoogleSource } from "../sources/remote/GoogleSource";

@autoInjectable()
export class YoutubeRepository {
  constructor(private googleSource: GoogleSource) {}

  async getAllSubscriptions(accessToken: string) {
    let subscriptions: SubscriptionChannel[] = [];

    let nextPageToken: string | undefined = "";

    while (nextPageToken != undefined) {
      const resSdk = await this.googleSource.youtubeClient.subscriptions.list({
        part: ["snippet"],
        mine: true,
        maxResults: 50,
        fields: "items(snippet(title, resourceId)), nextPageToken",
        order: "relevance",
        pageToken: nextPageToken,
        access_token: accessToken,
      });

      const resData = resSdk.data;

      const newItems = (resData.items ?? []).map((item) => {
        const title = item.snippet?.title;
        const channelId = item.snippet?.resourceId?.channelId;

        return new SubscriptionChannel({
          url: `https://www.youtube.com/channel/${channelId}`,
          name: title as string,
        });
      });

      subscriptions = [...subscriptions, ...newItems];

      nextPageToken = resData.nextPageToken as string | undefined;
    }

    return subscriptions;
  }
}
