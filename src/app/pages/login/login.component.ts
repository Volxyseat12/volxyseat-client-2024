import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TransactionService } from './../../services/transaction.service';
import { Component } from '@angular/core';

import { LoginService } from '../../services/login.service';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookiepopupComponent } from '../../components/cookiepopup/cookiepopup.component';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ILogin } from '../../models/SubscriptionModel/ILogin';
import { ToastService } from 'angular-toastify';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CookiepopupComponent,
    FormsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  cookiesAceitos: boolean;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private transactionService: TransactionService,
    private messageService: MessageService,
    private _toastService: ToastService
  ) {
    this.cookiesAceitos = this.cookieService.get('aceitou_cookies') === 'true';
  }

  public loginRequest: ILogin = {
    userName: '',
    password: '',
  };

  login() {
    this.loginService.post(this.loginRequest).subscribe({
      next: (response: any) => {
        this.transactionService.getById(response.clientId).subscribe({
          error: (error: any) => {
            console.log('Erro ao obter transação!', error);
          },
        });
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('email', response.email);
        localStorage.setItem('username', response.name);
        localStorage.setItem('clientId', response.clientId);
        this._toastService.success('Login feito com Sucesso!');
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this._toastService.error('Falha no Login!');
      },
    });
  }
}
