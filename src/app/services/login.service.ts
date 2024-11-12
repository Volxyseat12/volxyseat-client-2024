import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../models/SubscriptionModel/ILogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = 'https://localhost:7088/api/v1/User/login';

  constructor(private http: HttpClient) {}

  post(login: ILogin) {
    return this.http.post(`${this.apiUrl}`, login);
  }
}
