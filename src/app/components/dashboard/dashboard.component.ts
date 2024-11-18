import { Component } from '@angular/core';
import { LogOutService } from '../../services/log-out.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastService } from 'angular-toastify';
import { MessageService } from 'primeng/api';

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

  constructor(private logOutService: LogOutService, private router: Router, private toastService: ToastService, private messageService: MessageService) {

  }

  logout() {
    this.logOutService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.username = null;
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
        this.toastService.success('Logout realizado com sucesso!');
      },
      error: (error: any) => {
        console.error('Erro ao fazer logout:', error);
        this.toastService.error('Erro ao fazer logout!');
      },
    });
  }
}
