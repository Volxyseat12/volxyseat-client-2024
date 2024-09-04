import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Register } from '../../models/SubscriptionModel/Register';
import { RegisterService } from '../../services/register.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userId!: string;

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  public newRegister: Register = new Register();


  registerAndLogin() {
    console.log(this.newRegister)
    this.registerService.post(this.newRegister).subscribe(
      (response: any) => {
        console.log('Temos uma nova empresa registrada!', response);
        this.loginService.post({ email: this.newRegister.email, password: this.newRegister.password }).subscribe(
          (loginResponse: any) => {
            console.log('Login bem-sucedido!', loginResponse);
            this.newRegister = new Register();
            this.router.navigate(['/login']);
          },
          (loginError: any) => {
            console.log('Erro ao fazer login!', loginError);
          }
        );
      }
    )
  }
}
