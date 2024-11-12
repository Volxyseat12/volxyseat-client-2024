import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogOutService } from '../../services/log-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileComponent {
  username: string | null = null;
  isAuthenticated: boolean = false;


  constructor(private logOutService: LogOutService, private router: Router) {
    this.checkUserLogin();
  }

  showDropdown: boolean = false;

  userName = 'John Doe';
  userEmail = 'john.doe@example.com';
  currentPlan = 'Pro Plan';
  billingDate = 'July 1, 2023';
  purchaseHistory = [
    { date: 'June 1, 2023', plan: 'Pro Plan', amount: '$29.99' },
    { date: 'May 1, 2023', plan: 'Pro Plan', amount: '$29.99' },
    { date: 'April 1, 2023', plan: 'Basic Plan', amount: '$9.99' }
  ];

  checkUserLogin() {
    const token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.isAuthenticated = !!token;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
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
