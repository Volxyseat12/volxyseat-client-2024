import { HeaderComponent } from '../../components/header/header.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { MercadoPagoService } from './../../services/mercado-pago.service';
import { Component, OnInit } from '@angular/core';
import { LogOutService } from '../../services/log-out.service';
import { Router } from '@angular/router';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { ITransactionResponse } from '../../models/SubscriptionModel/ITransactionResponse';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CancelComponent } from '../../components/cancel/cancel.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, DashboardComponent, MatDialogModule],
})
export class ProfileComponent implements OnInit {
  subscription: ISubscription | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  username: string | null = null;
  email: string | null = null;
  showDropdown: boolean = false;
  isAuthenticated: boolean = false;
  userTransaction: ITransactionResponse | null = null;

  constructor(
    private logOutService: LogOutService,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.checkUserLogin();
    this.getTransaction();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  subscriptionEnumToString(enumValue: SubscriptionEnum): string {
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

  logout() {
    this.logOutService.logout();
    this.router.navigate(['/login']);
  }

  getSubscriptionType(type: string) {
    return (
      SubscriptionEnum[type as keyof typeof SubscriptionEnum] || 'Desconhecido'
    );
  }

  private checkUserLogin() {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.isAuthenticated = !!this.username;
  }

  getTransaction(): void {
    this.transactionService
      .getById(localStorage.getItem('clientId'))
      .subscribe({
        next: (res) => {
          this.userTransaction = <ITransactionResponse>res;

          this.loadSubscriptionFromStorage();
        },
        error: (error: any) => {
          console.log(error.message);
          this.subscription = null;
          this.isLoading = false;
        },
      });
  }

  private loadSubscriptionFromStorage() {
    console.log(this.userTransaction?.isActive);
    if (!this.userTransaction?.isActive) {
      this.subscription = null;
      this.isLoading = false;
      return;
    }
    const subId = localStorage.getItem('subId');

    if (subId) {
      this.loadSubscription(subId);
    } else {
      this.isLoading = false;
    }
  }

  private loadSubscription(id: string) {
    this.subscriptionService.getById(id).subscribe({
      next: (subscription: ISubscription) => {
        this.subscription = subscription;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log('estou aqui');
        if (err && err.message) {
          this.error = err.message;
        } else {
          this.error = 'Nenhum plano adquirido ainda';
        }
        this.subscription = null;
        this.isLoading = false;
      },
    });
  }

  cancelConfirm() {
    this.dialog.open(CancelComponent, {
    });
  }
}
