import { Component, OnInit } from '@angular/core';
import { LogOutService } from '../../services/log-out.service';
import { Router } from '@angular/router';
import { ISubscription } from '../../models/SubscriptionModel/ISubscription';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionEnum } from '../../models/Enums/SubscriptionEnum';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, DashboardComponent, FooterComponent]
})
export class ProfileComponent implements OnInit {
  subscription: ISubscription | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  username: string | null = null;
  email: string | null = null;
  showDropdown: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private logOutService: LogOutService,
    private router: Router,
    private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.checkUserLogin();
    this.loadSubscriptionFromStorage();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.logOutService.logout();
    this.router.navigate(['/login']);
  }

  getSubscriptionType(type: string) {
    return SubscriptionEnum[type as keyof typeof SubscriptionEnum] || 'Desconhecido';
  }

  private checkUserLogin() {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.isAuthenticated = !!this.username;
  }

  private loadSubscriptionFromStorage() {
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
        if (err && err.message) {
          this.error = err.message;
        } else {
          this.error = 'Nenhum plano adquirido ainda';
        }
        this.subscription = null;
        this.isLoading = false;
      }
    });
  }
}