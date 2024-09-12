import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { SubscriptionService } from '../../services/subscription.service';
import { ISubscription } from '../../models/SubscriptionModel/Subscription';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ],
})
export class SubscriptionComponent implements OnInit {
  private _subscription: Subject<null> = new Subject<null>();
  subscriptions: ISubscription[] = [];

  constructor(private _service: SubscriptionService) { }

  ngOnInit(): void {
    this._service.getSubscriptions().pipe(takeUntil(this._subscription)).subscribe((response) => {
      this.subscriptions = response;
      console.log(this.subscriptions);
    });
  }
  

  tiers = [
    { name: "BASIC", price: "R$ 59/mês", buttonText: "Contratar", buttonVariant: "default" },
    { name: "MEDIUM", price: "R$ 139/mês", buttonText: "Contratar", buttonVariant: "default" },
    { name: "ADVANCED", price: "R$ 389/mês", buttonText: "Contratar", buttonVariant: "default" },
    { name: "CUSTOM", price: "R$ 549/mês", buttonText: "Contratar", buttonVariant: "default" },
  ];

  categories = [
    { name: "Suporte" },
    { name: "Recursos gerais" },
    { name: "Marketing" },
    { name: "Logística" },
    { name: "Gestão da loja" },
    { name: "Personalização" },
    { name: "Formas de pagamento" },
    { name: "Integrações" },
  ];

  features: any = {
    "Suporte": [
      { name: "Central de autoatendimento", tiers: [true, true, true, true] },
      { name: "Messenger", tiers: [true, true, true, true] },
      { name: "Email", tiers: [true, true, true, true] },
      { name: "Whatsapp", tiers: [false, true, true, true] },
      { name: "Telefone", tiers: [false, false, true, true] },
      { name: "Telefone com atendimento prioritário", tiers: [false, false, false, true] },
    ],
  };

  selectedCategory: string = 'Suporte';

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
  }
}