import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { LogOutService } from '../../services/log-out.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

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
    MatIconModule,
    DashboardComponent,
    HeaderComponent,
    FooterComponent
]
})
export class AdminComponent {
  SubscriptionEnum = SubscriptionEnum;
  username: string | null = null;
  isAuthenticated: boolean = false;
  showDropdown: boolean = false;
  showTypeDropdown: boolean = false;
  selectedType: SubscriptionEnum | null = null;

  subscriptions: ISubscription[] = [
    {
      id: '1',
      type: SubscriptionEnum.Basic,
      description: 'Access to basic features and limited support.',
      price: 19.99
    },
    {
      id: '2',
      type: SubscriptionEnum.Medium,
      description: 'Access to all standard features and priority support.',
      price: 59.99
    },
    {
      id: '3',
      type: SubscriptionEnum.Personalized,
      description: 'Comprehensive access to advanced features and 24/7 support.',
      price: 199.99
    }
  ];

  subscriptionTypes = [
    SubscriptionEnum.Basic,
    SubscriptionEnum.Medium,
    SubscriptionEnum.Advanced,
    SubscriptionEnum.Personalized
  ];

  constructor(private logOutService: LogOutService, private router: Router) {
    this.checkUserLogin();
  }

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
    this.showTypeDropdown = false; // Close the type dropdown when user dropdown is toggled
  }

  toggleTypeDropdown(): void {
    this.showTypeDropdown = !this.showTypeDropdown;
    this.showDropdown = false; // Close the user dropdown when type dropdown is toggled
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
