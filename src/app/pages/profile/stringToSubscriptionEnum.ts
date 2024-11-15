import { SubscriptionEnum } from "../../models/Enums/SubscriptionEnum";

export function stringToSubscriptionEnum(value: string): SubscriptionEnum | undefined {
  switch (value) {
    case 'Básico':
      return SubscriptionEnum.Basic;
    case 'Médio':
      return SubscriptionEnum.Medium;
    case 'Avanãdo':
      return SubscriptionEnum.Advanced;
    default:
      return undefined;
  }
}
