import { ButtonModule } from 'primeng/button';
import { TransactionService } from './../../services/transaction.service';
import { Component } from '@angular/core';

import { LoginService } from '../../services/login.service';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { ILogin } from '../../models/SubscriptionModel/ILogin';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  transactionId!: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private transactionService: TransactionService,
    private _toastService: ToastService
  ) {
  }

  public loginRequest: ILogin = {
    userName: '',
    password: '',
  };

  login() {
    this.loginService.post(this.loginRequest).subscribe({
      next: (response: any) => {
        this.transactionService.getById(response.clientId).subscribe({
          next: (transactionResponse: any) => {
            this.transactionId = transactionResponse.id;
          },
          error: (error: any) => {
            console.log('Erro ao obter transação!', error);
          },
        });
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('email', response.email);
        localStorage.setItem('username', response.name);
        localStorage.setItem('clientId', response.clientId);
        localStorage.setItem('transactionId', this.transactionId);
        this._toastService.success('Login successful!');
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log('Erro ao fazer login!', error);
        this._toastService.error('Login failed!');
      },
    });
  }
}
