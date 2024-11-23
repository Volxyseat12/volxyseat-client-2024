import { SubscriptionEnum } from "../Enums/SubscriptionEnum";
import { SubscriptionStatus } from "../Enums/SubscriptionStatus";
import { ISubscriptionProperties } from "../ISubscriptionProperties";

export interface ISubscriptionRequest {
    id: string,
    type: SubscriptionEnum;
    status: SubscriptionStatus | null;
    description: string;
    price: number;
    mercadoPagoPlanId: string;
    subscriptionProperties: ISubscriptionProperties;
}