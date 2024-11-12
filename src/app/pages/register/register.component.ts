import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from '../../models/SubscriptionModel/IRegister';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userId!: string;

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private router: Router
  ) {}

  public newRegister: IRegister = new IRegister();

  registerAndLogin() {
    console.log(this.newRegister);
    this.registerService.post(this.newRegister).subscribe((response: any) => {
      console.log('Temos uma nova empresa registrada!', response);
      this.newRegister = new IRegister();
      this.router.navigate(['/login']);
    });
  }
}
