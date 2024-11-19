import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from '../../models/SubscriptionModel/IRegister';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userId!: string;
  registerForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private _toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      companyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  registerAndLogin() {
    if (this.registerForm.valid) {
      const newRegister = {
        name: this.registerForm.get('companyName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };
      console.log(newRegister);
      this.registerService.post(newRegister).subscribe({
        next: (response: any) => {
          console.log('Temos uma nova empresa registrada!', response);
          this.registerForm.reset();
          this._toastService.success('Registrado com Sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          this._toastService.error('Falha no Cadastro!');
        },
      });
    }
  }
}
