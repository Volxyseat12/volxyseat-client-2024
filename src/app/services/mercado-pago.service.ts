import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VolxyseatEndpoints } from '../volxyseat.endpoints';
import { environment } from '../environments/environment';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createMercadoPagoSubscription(subscriptionRequest: any) {
    const createSubscriptionUrl =
      VolxyseatEndpoints.endpoints.createMPSubscription(this.apiUrl);

    return this.http.post(`${createSubscriptionUrl}`, subscriptionRequest);
  }
}
