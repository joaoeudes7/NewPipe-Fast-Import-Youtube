export class SubscriptionsNewPile {
    service_id: number = 0;
    url: string = "";
    name: string = "";

    constructor(obj: Partial<SubscriptionsNewPile>) {
        Object.assign(this, obj);
    }
}