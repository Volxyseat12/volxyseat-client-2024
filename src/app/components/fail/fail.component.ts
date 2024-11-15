import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100 animate-pulse">
  <div class="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInUp">
    <div class="flex items-center justify-center mb-6">
      <svg class="w-16 h-16 text-red-500 animate__animated animate__shakeX" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <h2 class="text-2xl font-bold text-gray-800 mb-2 animate__animated animate__fadeInDown flex justify-center items-center">Falha no Pagamento!</h2>
    <p class="text-gray-600 mb-6 animate__animated animate__fadeInUp">Não foi possível efetuar a compra deste plano.</p>
    <div class="flex justify-center animate__animated animate__fadeInUp">
<a href="/">
<button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
        Voltar para a Home
      </button>
</a>
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
        animate('{{ delay }}ms 2s', keyframes([
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
}