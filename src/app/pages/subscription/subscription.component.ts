import { Component } from '@angular/core';
import { Subscription } from '../../models/SubscriptionModel/Subscription';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent {
  subscriptions: Subscription[] = [];
  subscriptionEnum = SubscriptionEnum;

  subscriptionTypes = Object.keys(SubscriptionEnum).filter((key) =>
    this.isSubscriptionEnumKey(key)
  );

  isSubscriptionEnumKey(key: string): key is keyof typeof SubscriptionEnum {
    return key in SubscriptionEnum;
  }

  constructor(private subscriptionService: SubscriptionService) {
    this.getAll();
    for (let teste of this.subscriptionTypes) {
      console.log(this.subscriptionTypeLabels[this.subscriptionEnum[<SubscriptionEnum>teste]])
    }
  }

  subscriptionTypeLabels = {
    [SubscriptionEnum.Basic]: 'Básico',
    [SubscriptionEnum.Medium]: 'Médio',
    [SubscriptionEnum.Premium]: 'Avançado',
  };

  getAll() {
    this.subscriptionService.getAll().subscribe((data) => {
      this.subscriptions = data;
      console.log(data);
    });
  }
}
