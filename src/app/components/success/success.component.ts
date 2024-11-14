import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ITransaction } from '../../models/SubscriptionModel/ITransaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 overflow-hidden"
    >
      <div class="w-full max-w-md relative bg-white rounded-lg shadow-xl">
        <div class="flex flex-col items-center justify-center p-6 text-center">
          <!-- Check icon com animação -->
          <div class="mb-6 relative" [@scaleIn]="isVisible">
            <div class="rounded-full bg-green-100 p-3" [@pulse]="isVisible">
              <div [@drawPath]="isVisible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  class="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <!-- Partículas de confete -->
            <ng-container *ngIf="showConfetti">
              <div
                *ngFor="let particle of particles; let i = index"
                class="absolute size-2 rounded-full bg-green-400"
                [@particleAnimation]="{ value: '', params: { delay: i * 100 } }"
              ></div>
            </ng-container>
          </div>

          <!-- Título com ícone de brilho -->
          <div class="relative" [@fadeInUp]="isVisible">
            <h2 class="text-3xl font-bold mb-2 text-green-800">Success!</h2>
            <div class="absolute -right-6 -top-6" [@sparkleRotate]="isVisible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-yellow-400"
              >
                <path
                  d="M12 3v3m0 12v3M5.2 5.2l2.1 2.1m9.4 9.4l2.1 2.1M3 12h3m12 0h3M5.2 18.8l2.1-2.1m9.4-9.4l2.1-2.1"
                />
              </svg>
            </div>
          </div>

          <!-- Mensagem de sucesso -->
          <p class="text-lg text-green-600 mb-6" [@fadeInUp]="isVisible">
            Your payment has been processed successfully.
          </p>

          <!-- Botão do dashboard -->
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
            (click)="goToDashboard()"
            [@fadeInUp]="isVisible"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="ml-2"
            >
              <path d="M5 12H19M12 5l7 7-7 7" />
            </svg>

            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('scaleIn', [
      state('false', style({ transform: 'scale(0)' })),
      state('true', style({ transform: 'scale(1)' })),
      transition(
        'false => true',
        animate('0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
      ),
    ]),
    trigger('pulse', [
      state('true', style({ transform: 'scale(1)' })),
      transition('* => true', [
        animate(
          '2s infinite',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.1)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('drawPath', [
      state('false', style({ 'stroke-dashoffset': '1' })),
      state('true', style({ 'stroke-dashoffset': '0' })),
      transition('false => true', animate('0.5s')),
    ]),
    trigger('particleAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate(
          '2s {{ delay }}ms infinite',
          keyframes([
            style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 0.5 }),
            style({
              opacity: 0,
              transform: 'scale(0) translate({{ x }}px, {{ y }}px)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('sparkleRotate', [
      transition('* => true', [
        animate(
          '0.5s 1.5s',
          keyframes([
            style({ transform: 'rotate(0)' }),
            style({ transform: 'rotate(10deg)' }),
            style({ transform: 'rotate(-10deg)' }),
            style({ transform: 'rotate(0)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SuccessComponent implements OnInit {
  constructor(private transactionService: TransactionService) {
    this.createTransaction();
  }

  isVisible = false;
  showConfetti = false;
  particles = Array(20)
    .fill(0)
    .map(() => ({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    }));

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      setTimeout(() => {
        this.showConfetti = true;
      }, 1000);
    });
  }

  goToDashboard() {
    alert('Redirecting to dashboard...');
  }

  createTransaction() {
    const subId = localStorage.getItem('subId');
    const clientId = localStorage.getItem('clientId');
    const preApprovalId = localStorage.getItem('preApprovalId');
    console.log(`${subId}\n${clientId}\n${preApprovalId}`);
    if (subId && clientId && preApprovalId) {
      const transaction: ITransaction = {
        clientId: clientId,
        subscriptionId: subId,
        mercadoPagoSubscriptionId: preApprovalId,
      };
      this.transactionService.post(transaction).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
}
