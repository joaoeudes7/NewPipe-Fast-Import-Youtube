import { autoInjectable } from "tsyringe";
import { YoutubeRepository } from "../../data/repositories/YoutubeRepository";
import { SubscriptionsNewPile } from "../../models/SubscriptionsNewPile";

@autoInjectable()
export class GetSubscriptionsYotubeNewPipeUseCase {
  constructor(private youtubeRepository: YoutubeRepository) {}

  async execute(data: { accessToken: string }) {
    const { accessToken } = data;

    const subscriptions = await this.youtubeRepository.getAllSubscriptions(
      accessToken
    );

    const newPipeSubscriptions = subscriptions.map((it) => {
      return new SubscriptionsNewPile(it);
    });

    return newPipeSubscriptions;
  }
}
