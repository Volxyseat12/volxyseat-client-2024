import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ISubscription } from '../models/SubscriptionModel/Subscription';
import { VolxyseatEndpoints } from '../volxyseat.endpoints';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private _subscription: BehaviorSubject<ISubscription[]> = new BehaviorSubject<ISubscription[]>([]);

  apiUrl = `${environment.apiUrl}/Subscription`;

  constructor(private http: HttpClient) { }

  planoSelecionado: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get subscriptions$(): Observable<ISubscription[]> {
    return this._subscription.asObservable();
  }
  
  getSubscriptions(): Observable<ISubscription[]> {
    const apiUrl = environment.apiUrl; 
    const endpointUrl = VolxyseatEndpoints.endpoints.getSubscriptions(apiUrl);
    return this.http.get<ISubscription[]>(endpointUrl);
  }
  

  setPlano(plano: any) {
    this.planoSelecionado.next(plano);
  }

  getPlano(): any {
    return this.planoSelecionado.getValue();
  }

  getById(id: string): any {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<ISubscription[]> {
    return this.http.get<ISubscription[]>(this.apiUrl);
  }

  getDetalhesPlano(id: number, header: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: header });
  }

  getSubscriptionStatus(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${id}`);
  }
}