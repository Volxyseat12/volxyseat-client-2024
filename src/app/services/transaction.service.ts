import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ITransaction } from '../models/SubscriptionModel/ITransaction';
import { HttpClient } from '@angular/common/http';
import { ICreateTransactionResponse } from '../models/ICreateTransactionResponse';
import { VolxyseatEndpoints } from '../volxyseat.endpoints';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Tipando o retorno como Observable<ICreateTransactionResponse>
  post(transaction: ITransaction) {
    const endpointUrl = VolxyseatEndpoints.endpoints.createTransaction(
      this.apiUrl
    );
    console.log(endpointUrl);
    
    // Adicionando a tipagem para a resposta
    return this.http.post<ICreateTransactionResponse>(`${endpointUrl}`, transaction);
  }

  // Tipando a resposta do método getById (ajuste de acordo com o que a resposta retorna)
  getById(id: any) {
    const endpointUrl = VolxyseatEndpoints.endpoints.getTransactionById(
      this.apiUrl,
      id
    );
    return this.http.get<ICreateTransactionResponse>(endpointUrl);  // Ajuste conforme o tipo de resposta
  }
}
