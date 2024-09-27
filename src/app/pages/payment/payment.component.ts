import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { ITransaction } from '../../models/SubscriptionModel/ITransaction';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  planoSelecionado: ISubscription;
  username: string | null = null;
  transaction: any;
  planId: string = '';

  ngOnInit() {}

  constructor(
    private subService: SubscriptionService,
    private tranService: TransactionService,
    private router: Router
  ) {
    this.planoSelecionado = this.subService.getPlano();
    let subscriptionId = localStorage.getItem('subId');
    if (subscriptionId === null) {
      throw new Error('teste');
    }

    this.subService
      .getById(subscriptionId)
      .subscribe((plano: ISubscription) => {
        this.planoSelecionado = plano;
        console.log(plano);
        this.planId = this.planoSelecionado.id;
        localStorage.setItem('subId', this.planoSelecionado.id);
      });

    this.transaction = this.tranService
      .getById(localStorage.getItem('transactionId'))
      .subscribe((response: any) => {
        console.log(response);
        return response;
      });
  }

  checkUserLogin() {
    this.username = localStorage.getItem('username');
  }

  public newTransaction: ITransaction = new ITransaction();
  public clientId: string | null = localStorage.getItem('clientId');

  insertPayment() {
    console.log(this.clientId);
    console.log(this.planId);
    if (this.planId !== null && this.clientId !== null) {
      this.newTransaction.client = this.clientId;
      this.newTransaction.subscription = this.planId;
    }

    this.tranService.post(this.newTransaction).subscribe(
      (response: any) => {
        localStorage.setItem('transactionId', response.id);
        this.router.navigate(['/']);
        return response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
