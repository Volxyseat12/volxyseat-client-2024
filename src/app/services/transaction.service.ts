import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ITransaction } from '../models/SubscriptionModel/Transaction';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  apiUrl = `${environment.apiUrl}/Transaction`;

  constructor(private http: HttpClient) { }

  post(transaction: ITransaction){
    return this.http.post(`${this.apiUrl}`, transaction)
  }

  getById(id: any){
    return this.http.get(`${this.apiUrl}/${id}`)
  }
}
