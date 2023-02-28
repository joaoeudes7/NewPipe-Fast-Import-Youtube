export class SubscriptionChannel {
    url: string = "";
    name: string = "";

    constructor(obj: SubscriptionChannel) {
        Object.assign(this, obj);
    }
}