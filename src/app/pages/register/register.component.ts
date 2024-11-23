import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from '../../models/SubscriptionModel/IRegister';
import { ToastService } from 'angular-toastify';
import { BlobService } from '../../services/blob.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userId!: string;
  blobUrl: string = '';

  ngOnInit(): void {
    this.blobUrl = this.blobService.getBlobUrl();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private _toastService: ToastService,
    private blobService: BlobService
  ) {}

  public newRegister: IRegister = new IRegister();

  register() {
    console.log(this.newRegister);
    this.authService.register(this.newRegister).subscribe({
      next: (response: any) => {
        console.log('Temos uma nova empresa registrada!', response);
        this.newRegister = new IRegister();
        this._toastService.success('Register successful!');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this._toastService.error('Register failed!');
      },
    });
  }
}
