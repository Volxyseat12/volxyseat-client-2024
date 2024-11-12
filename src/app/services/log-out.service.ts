import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VolxyseatEndpoints } from '../volxyseat.endpoints';

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  logout() {
    const endpointUrl = VolxyseatEndpoints.endpoints.logout(this.apiUrl);
    return this.http.post(endpointUrl, {});
  }
}
