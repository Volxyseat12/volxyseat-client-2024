import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { VolxyseatEndpoints } from '../volxyseat.endpoints';
import { SubscriptionEnum } from '../models/Enums/SubscriptionEnum';
import { ISubscription } from '../models/SubscriptionModel/ISubscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private _subscription: BehaviorSubject<ISubscription[]> = new BehaviorSubject<
    ISubscription[]
  >([]);

  apiUrl = `${environment.apiUrl}/Subscription`;

  constructor(private http: HttpClient) {}

  planoSelecionado: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  getSubscriptionTypeText(type: SubscriptionEnum): string {
    const typeMap: { [key: number]: string } = {
      [SubscriptionEnum.Basic]: 'Básico',
      [SubscriptionEnum.Medium]: 'Médio',
      [SubscriptionEnum.Advanced]: 'Avançado',
      [SubscriptionEnum.Personalized]: 'Personalizado',
    };
    return typeMap[type] || 'Unknown';
  }

  setPlano(plano: any) {
    this.planoSelecionado.next(plano);
  }

  getPlano(): any {
    return this.planoSelecionado.getValue();
  }

  getById(id: string): any {
    const apiUrl = environment.apiUrl;
    const endpointUrl = VolxyseatEndpoints.endpoints.getSubscriptionById(
      apiUrl,
      id
    );
    return this.http.get(endpointUrl);
  }

  getAll(): Observable<ISubscription[]> {
    return this.http.get<ISubscription[]>(this.apiUrl);
  }

  getSubscriptionDetails(id: number, header: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: header });
  }

  getSubscriptionStatus(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${id}`);
  }
}
