import { Component } from '@angular/core';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CancelComponent } from "../../components/cancel/cancel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SubscriptionComponent,
    AboutComponent,
    FooterComponent,
    CancelComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
