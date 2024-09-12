import { SubscriptionEnum } from '../Enums/SubscriptionEnum';
import { SubscriptionStatus } from '../Enums/SubscriptionStatus';
import { SubscriptionProperties } from '../SubscriptionProperties';

export interface ISubscription {
  id: string;
  type: SubscriptionEnum;
  status: SubscriptionStatus;
  description: string;
  price: number;
  createdOn: Date;
  updatedOn: Date;
  subscriptionProperties: SubscriptionProperties;
}
