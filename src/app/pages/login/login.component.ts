import { TransactionService } from './../../services/transaction.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';
import { CookiepopupComponent } from '../../components/cookiepopup/cookiepopup.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { Login } from '../../models/SubscriptionModel/Login';

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
  transactionId: string = '';
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private transactionService: TransactionService,
    private messageService: MessageService
  ) {
    this.cookiesAceitos = this.cookieService.get('aceitou_cookies') === 'true';
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
    });
  }

  public loginRequest: Login = {
    userName: '',
    password: '',
  };

  getByUserId(id: string) {
    this.transactionService.getById(id).subscribe({
      next: (reponse: any) => {
        this.transactionId = reponse.id;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  login() {
    this.loginService.post(this.loginRequest).subscribe({
      next: (response: any) => {
        this.getByUserId(response.clientId);
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('email', response.email);
        localStorage.setItem('username', response.name);
        localStorage.setItem('clientId', response.clientId);
        localStorage.setItem('transactionId', this.transactionId);
        this.showSuccess();
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log('Erro ao fazer login!', error);
      },
    });
  }
}
