import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileSubscriptionsComponent } from './pages/profile-subscriptions/profile-subscriptions.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SuccessComponent } from './components/success/success.component';
import { FailComponent } from './components/fail/fail.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'subscription', component: SubscriptionComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'profile-subscriptions', component: ProfileSubscriptionsComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'success', component: SuccessComponent },
    { path: 'fail', component: FailComponent }

];
