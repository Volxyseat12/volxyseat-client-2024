import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

interface Item {
  description: string;
  qty: number;
  price: number;
  totalAmount: number;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  items: Item[] = [
    { description: 'Website Design', qty: 1, price: 1500.00, totalAmount: 1500.00 },
    { description: 'Logo Design', qty: 1, price: 500.00, totalAmount: 500.00 },
    { description: 'SEO Optimization', qty: 5, price: 50.13, totalAmount: 250.65 }
  ];

  client = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    invoiceDate: 'July 15, 2023'
  };

  invoice = {
    number: '42D42-0001',
    amount: 2250.65,
    status: 'Open',
    dueDate: 'Due next month'
  };
}
