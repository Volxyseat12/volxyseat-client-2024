import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastService } from 'angular-toastify';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './dashboard.component.html',
  providers: [MessageService],
})
export class DashboardComponent {
  username: string | null = null;
  isAuthenticated: boolean = false;

  constructor(private router: Router, private toastService: ToastService) {

  }

  logout() {
    localStorage.clear();
    this.username = null;
    this.isAuthenticated = false;
    this.router.navigate(['/']);
    this.toastService.success('Logout realizado com sucesso!');
  }
}
