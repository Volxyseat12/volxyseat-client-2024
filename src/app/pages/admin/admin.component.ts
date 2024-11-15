import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { LogOutService } from '../../services/log-out.service';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';

interface ISubscription {
  id: string;
  type: SubscriptionEnum;
  description: string;
  price: number;
}

@Component({
  selector: 'app-admin-subscription',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
]
})
export class AdminComponent implements OnInit{
  SubscriptionEnum = SubscriptionEnum;
  username: string | null = null;
  isAuthenticated: boolean = false;
  showDropdown: boolean = false;
  showTypeDropdown: boolean = false;
  selectedType: SubscriptionEnum | null = null;

  constructor(private logOutService: LogOutService, private router: Router, private subscriptionService: SubscriptionService) {
    this.checkUserLogin();
  }

  ngOnInit(){
    this.getSubscriptions();
  }

  subscriptions?: ISubscription[];

  getSubscriptions(){
    this.subscriptionService.getAll().subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
      console.log(subscriptions);
    })
  }

  subscriptionTypes = [
    SubscriptionEnum.Basic,
    SubscriptionEnum.Medium,
    SubscriptionEnum.Advanced,
    SubscriptionEnum.Personalized
  ];



  subscriptionEnumToString(enumValue: SubscriptionEnum): string {
    switch (enumValue) {
      case SubscriptionEnum.Basic:
        return 'Básico';
      case SubscriptionEnum.Medium:
        return 'Médio';
      case SubscriptionEnum.Advanced:
        return 'Avançado';
      case SubscriptionEnum.Personalized:
        return 'Personalizado';
      default:
        return 'Sem plano';
    }
  }

  checkUserLogin() {
    const token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.isAuthenticated = !!token;
  }

  toggleUserDropdown(): void {
    this.showDropdown = !this.showDropdown;
    this.showTypeDropdown = false;
  }

  toggleTypeDropdown(): void {
    this.showTypeDropdown = !this.showTypeDropdown;
    this.showDropdown = false;
  }

  selectType(type: SubscriptionEnum): void {
    this.selectedType = type;
    this.showTypeDropdown = false;
  }

  logout() {
    this.logOutService.logout().subscribe(
      () => {
        localStorage.clear();
        this.username = null;
        this.isAuthenticated = false;
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Erro ao fazer logout:', error);
      }
    );
  }
}
