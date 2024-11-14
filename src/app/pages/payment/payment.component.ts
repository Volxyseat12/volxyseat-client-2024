import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SubscriptionService } from '../../services/subscription.service';
import { TransactionService } from '../../services/transaction.service';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { CommonModule } from '@angular/common';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ITransaction } from '../../models/SubscriptionModel/ITransaction';
import { ICreateSubscription } from '../../models/MercadoPago/ICreateSubscription';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { environment } from '../../environments/environment';
import { SuccessComponent } from '../../components/success/success.component';
import { FailComponent } from '../../components/fail/fail.component';
import { Router } from '@angular/router';
import { IPreApprovalResponse } from '../../models/MercadoPago/IPreApprovalResponse';

interface Item {
  description: string;
  qty: number;
  price: number;
  totalAmount: number;
}

declare var MercadoPago: any;

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    HeaderComponent,
    FooterComponent,
    SuccessComponent,
    FailComponent,
  ],
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    await this.fetchPlanDetails();
    this.loadMercadoPagoScript();
  }

  items: Item[] = [
    {
      description: 'Website Design',
      qty: 1,
      price: 1500.0,
      totalAmount: 1500.0,
    },
    { description: 'Logo Design', qty: 1, price: 500.0, totalAmount: 500.0 },
    {
      description: 'SEO Optimization',
      qty: 5,
      price: 50.13,
      totalAmount: 250.65,
    },
  ];

  client = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    invoiceDate: 'July 15, 2023',
  };

  invoice = {
    number: '42D42-0001',
    amount: 2250.65,
    status: 'Open',
    dueDate: 'Due next month',
  };

  constructor(
    private subscriptionService: SubscriptionService,
    private transactionService: TransactionService,
    private mercadoPagoService: MercadoPagoService,
    private router: Router
  ) {}

  private cardForm: any;
  plan: ISubscription | undefined;

  fetchPlanDetails(): Promise<void> {
    return new Promise((resolve, reject) => {
      const subId = localStorage.getItem('subId');
      if (subId) {
        this.subscriptionService.getById(subId).subscribe(
          (plan: ISubscription) => {
            this.plan = plan;
            resolve();
          },
          (error: any) => {
            console.error('Error fetching plan details:', error);
            reject(error);
          }
        );
      } else {
        console.warn('No subscription ID found in localStorage.');
        reject(new Error('No subscription ID found in localStorage.'));
      }
    });
  }

  subscriptionEnumToString(enumValue: SubscriptionEnum | undefined): string {
    switch (enumValue) {
      case 0:
        return 'Básico';
      case 1:
        return 'Médio';
      case 2:
        return 'Avançado';
      case 3:
        return 'Personalizado';
      default:
        return 'Sem Plano';
    }
  }

  loadMercadoPagoScript(): void {
    if (typeof MercadoPago !== 'undefined') {
      this.initializeCardForm();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => this.initializeCardForm();
    document.body.appendChild(script);
  }

  initializeCardForm(): void {
    const mp = new MercadoPago(environment.mercadoPagoPublicKey, {
      locale: 'en-US',
    });

    if (!this.plan) throw new Error('No plan was found');

    this.cardForm = mp.cardForm({
      amount: this.plan.price.toString(),
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Card Number',
        },
        expirationDate: {
          id: 'form-checkout__expirationDate',
          placeholder: 'MM/YY',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Security Code',
        },
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Cardholder',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Issuing bank',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Installments',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Document type',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Document number',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'Email',
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) console.warn('Form Mounted handling error: ', error);
          else console.log('Form mounted');
        },
        onSubmit: (event: Event) => this.processPayment(event),
        onFetching: (resource: any) =>
          console.log('Fetching resource:', resource),
      },
    });
  }

  createTransaction() {
    const subId = localStorage.getItem('subId');
    const clientId = localStorage.getItem('clientId');
    console.log(`${subId}\n${clientId}`);
    if (subId && clientId && this.plan?.mercadoPagoPlanId) {
      const transaction: ITransaction = {
        clientId: clientId,
        subscriptionId: subId,
        mercadoPagoSubscriptionId: this.plan?.mercadoPagoPlanId,
      };
      this.transactionService.post(transaction).subscribe({
        next: (res) => {
          console.log(res);
          this.onSuccess();
        },
        error: (err) => {
          console.log(err.message);
          this.onFail();
        },
      });
    }
  }

  onSuccess(): void {
    // Navega para a rota de sucesso
    this.router.navigate(['/success']);
  }

  onFail(): void {
    // Navega para a rota de falha
    this.router.navigate(['/fail']);
  }

  createMercadoPagoSubscription(
    createMercadoPagoSubscriptionModel: ICreateSubscription
  ): void {
    this.mercadoPagoService
      .createMercadoPagoSubscription(createMercadoPagoSubscriptionModel)
      .subscribe({
        next: (res) => {
          console.log(res);
          let preApproval = <IPreApprovalResponse>res;
          localStorage.setItem('preApprovalId', preApproval.id);
          this.onSuccess();
        },
        error: (err) => {
          console.error(err.message);
          this.onFail();
        },
      });
  }

  processPayment(event: Event): void {
    event.preventDefault();

    const formData = this.cardForm.getCardFormData();
    if (!formData) {
      console.error('Error retrieving form data.');
      return;
    }

    const {
      paymentMethodId: payment_method_id,
      issuerId: issuer_id,
      cardholderEmail: email,
      amount,
      token,
    } = formData;

    if (this.plan) {
      const todayDate = new Date();
      const { mercadoPagoPlanId, type, price } = this.plan;
      console.log(mercadoPagoPlanId);
      const createSubscription: ICreateSubscription = {
        preapproval_plan_id: mercadoPagoPlanId,
        reason: this.subscriptionEnumToString(type),
        email: email,
        amount: price,
        billing_day: todayDate.getDate(),
        cardTokenId: token,
      };
      console.log(createSubscription);
      this.createMercadoPagoSubscription(createSubscription);
      return;
    }

    console.error('Erro ao criar subscription no mercado pago');
    // this.createTransaction();
  }
}
