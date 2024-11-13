import { Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  standalone: true,
  animations: [
    trigger('particleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate(
          '2s',
          style({
            opacity: 1,
            transform: 'scale(1)',
            offset: 0.5,
          })
        ),
        animate(
          '2s',
          style({
            opacity: 0,
            transform: 'scale(0)',
          })
        ),
      ]),
    ]),
  ],
})
export class ParticleComponent {
  @Input() delay!: number;
}