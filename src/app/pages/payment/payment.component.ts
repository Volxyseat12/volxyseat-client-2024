import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

interface Item {
  description: string;
  qty: number;
  price: number;
  totalAmount: number;
}

declare var MercadoPago: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  items: Item[] = [
    { description: 'Website Design', qty: 1, price: 1500.00, totalAmount: 1500.00 },
    { description: 'Logo Design', qty: 1, price: 500.00, totalAmount: 500.00 },
    { description: 'SEO Optimization', qty: 5, price: 50.13, totalAmount: 250.65 }
  ];

  client = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    invoiceDate: 'July 15, 2023'
  };

  invoice = {
    number: '42D42-0001',
    amount: 2250.65,
    status: 'Open',
    dueDate: 'Due next month'
  };

  private cardForm: any;

  ngOnInit(): void {
    this.loadMercadoPagoScript();
  }

  loadMercadoPagoScript(): void {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => this.initializeCardForm();
    document.body.appendChild(script);
  }

  initializeCardForm(): void {
    const mp = new MercadoPago('TEST-4679837029437600-102809-137cb3af76c246ba3bcbfb324fdbafbe-1569614916', { locale: 'en-US' });
    this.cardForm = mp.cardForm({
      amount: this.invoice.amount.toString(),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'cardholderName',
          placeholder: 'John Doe'
        },
        cardNumber: {
          id: 'cardNumber',
          placeholder: '1234 5678 9012 3456'
        },
        cardExpirationDate: {
          id: 'cardExpirationDate',
          placeholder: 'MM/YY'
        },
        securityCode: {
          id: 'securityCode',
          placeholder: '123'
        },
        installments: {
          id: 'installments',
          placeholder: '1'
        },
        identificationType: {
          id: 'identificationType',
          placeholder: 'CPF'
        },
        identificationNumber: {
          id: 'identificationNumber',
          placeholder: '123.456.789-00'
        },
        issuer: {
          id: 'issuer'
        }
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
        },
        onSubmit: (event: Event) => this.processPayment(event),
        onFetching: (resource: any) => {
          console.log('Fetching resource:', resource);
        }
      }
    });
  }

  processPayment(event: Event): void {
    event.preventDefault();
    
    const {
      paymentMethodId: payment_method_id,
      issuerId: issuer_id,
      cardholderEmail: email,
      amount,
      token
    } = this.cardForm.getCardFormData();

    fetch("/process_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        issuer_id,
        payment_method_id,
        transaction_amount: Number(amount),
        installments: Number((<HTMLInputElement>document.getElementById("installments")).value),
        description: "Descrição do pagamento",
        payer: {
          email
        }
      })
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
}
