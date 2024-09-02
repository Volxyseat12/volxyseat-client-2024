import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { ISubscription } from '../models/SubscriptionModel/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private _subscriptions: BehaviorSubject<ISubscription[]> = new BehaviorSubject<ISubscription[]>([]);
  apiUrl = `${environment.apiUrl}/Subscription`;

  constructor(private http: HttpClient) { }

  get subscriptions$(): Observable<ISubscription[]> {
    return this._subscriptions.asObservable();
  }

  selectedSubscription: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  set(subscription: any) {
    this.selectedSubscription.next(subscription);
  }

  get(): any {
    return this.selectedSubscription.getValue();
  }

  getById(id: string): any {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  getAll(header: HttpHeaders): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl, { headers: header });
  }

  getDetails(id: number, header: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: header });
  }

  getStatus(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${id}`);
  }
}