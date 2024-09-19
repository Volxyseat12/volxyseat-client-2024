import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/SubscriptionModel/Register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiUrl = 'https://localhost:7088/api/v1/User/new-user';

  constructor(private http: HttpClient) {}

  post(register: Register) {
    return this.http.post(this.apiUrl, register);
  }
}
