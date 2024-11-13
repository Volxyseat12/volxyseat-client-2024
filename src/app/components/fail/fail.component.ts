// payment-error.component.ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 overflow-hidden">
      <div class="w-full max-w-md relative bg-white rounded-lg shadow-xl p-6">
        <div class="flex flex-col items-center justify-center text-center">
          <!-- Ícone X animado -->
          <div class="mb-6 relative" [@scaleIn]="isVisible">
            <div class="rounded-full bg-red-100 p-3" [@shake]="isVisible">
              <div [@drawPath]="isVisible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  class="text-red-600"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            
            <!-- Partículas -->
            <ng-container *ngIf="showParticles">
              <div *ngFor="let particle of particles; let i = index"
                   class="absolute size-2 rounded-full bg-red-400"
                   [@particleAnimation]="{value: '', params: {delay: i * 100}}">
              </div>
            </ng-container>
          </div>

          <!-- Título com ícone de alerta -->
          <div class="relative" [@fadeInUp]="isVisible">
            <h2 class="text-3xl font-bold mb-2 text-red-800">Payment Failed</h2>
            <div class="absolute -left-6 -top-6" [@alertShake]="isVisible">
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
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
          </div>

          <!-- Mensagem de erro -->
          <p class="text-lg text-red-600 mb-6" [@fadeInUp]="isVisible">
            We couldn't process your payment. Please try again.
          </p>

          <!-- Botão de retry -->
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
            (click)="retryPayment()"
            [@fadeInUp]="isVisible"
          >
            Retry Payment
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
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('scaleIn', [
      state('false', style({ transform: 'scale(0)' })),
      state('true', style({ transform: 'scale(1)' })),
      transition('false => true', animate('0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'))
    ]),
    trigger('shake', [
      state('true', style({ transform: 'rotate(0)' })),
      transition('* => true', [
        animate('0.5s', keyframes([
          style({ transform: 'rotate(0)' }),
          style({ transform: 'rotate(5deg)' }),
          style({ transform: 'rotate(-5deg)' }),
          style({ transform: 'rotate(0)' })
        ]))
      ])
    ]),
    trigger('drawPath', [
      state('false', style({ 'stroke-dashoffset': '1' })),
      state('true', style({ 'stroke-dashoffset': '0' })),
      transition('false => true', animate('0.5s'))
    ]),
    trigger('particleAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('2s {{ delay }}ms', keyframes([
          style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 0.5 }),
          style({ 
            opacity: 0, 
            transform: 'scale(0) translate({{ x }}px, {{ y }}px)', 
            offset: 1 
          })
        ]))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('alertShake', [
      transition('* => true', [
        animate('0.5s 1.5s', keyframes([
          style({ transform: 'rotate(0)' }),
          style({ transform: 'rotate(10deg)' }),
          style({ transform: 'rotate(-10deg)' }),
          style({ transform: 'rotate(0)' })
        ]))
      ])
    ])
  ]
})
export class FailComponent implements OnInit {
  isVisible = false;
  showParticles = false;
  particles = Array(20).fill(0).map(() => ({
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100
  }));

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      setTimeout(() => {
        this.showParticles = true;
      }, 1000);
    });
  }

  retryPayment() {
    alert('Retrying payment...');
  }
}