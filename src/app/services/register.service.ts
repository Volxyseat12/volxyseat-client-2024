import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../models/SubscriptionModel/Register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = `${environment.apiUrl}/Authentication/register`;

  constructor(private http: HttpClient) {}

  post(register: IRegister){
    return this.http.post(`${this.apiUrl}`, register)
  }
}
