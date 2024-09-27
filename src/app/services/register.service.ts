import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../models/SubscriptionModel/IRegister';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiUrl = 'https://localhost:7088/api/v1/User/new-user';

  constructor(private http: HttpClient) {}

  post(register: IRegister) {
    return this.http.post(this.apiUrl, register);
  }
}
