import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileComponent {
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

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
