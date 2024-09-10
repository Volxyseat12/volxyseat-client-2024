import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando o CommonModule
import { Subscription } from '../../models/SubscriptionModel/Subscription';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule], // Incluindo o CommonModule aqui
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent {
  subscriptions: Subscription[] = [];
  subscriptionEnum = SubscriptionEnum;

  plans = [
    { name: 'Basic', price: '$9/mo', buttonText: 'Try for free' },
    { name: 'Medium', price: '$29/mo', buttonText: 'Try for free' },
    { name: 'Advanced', price: '$59/mo', buttonText: 'Learn more' },
    { name: 'Custom', price: 'Contact us', buttonText: 'Learn more' }
  ];

  features = [
    {
      category: 'Support',
      items: [
        { name: '24/7 Email Support', basic: true, medium: true, advanced: true, custom: true },
        { name: 'Live Chat', basic: false, medium: true, advanced: true, custom: true },
        { name: 'Phone Support', basic: false, medium: false, advanced: true, custom: true }
      ] as Array<{ name: string; [key: string]: boolean | string }>
    },
  ];


  activeCategory = 'Support';
  filteredFeatures = this.features.find(feature => feature.category === this.activeCategory)?.items || [];

  setActiveCategory(category: string) {
    this.activeCategory = category;
    this.filteredFeatures = this.features.find(feature => feature.category === category)?.items || [];
  }

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
