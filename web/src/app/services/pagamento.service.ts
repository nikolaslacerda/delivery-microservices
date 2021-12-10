import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private API = environment.baseUrl + '/payment';

  constructor(private http: HttpClient) {
  }

  cria(pagamento): Observable<any> {
    this.ajustaIds(pagamento);
    return this.http.post(`${this.API}`, pagamento);
  }

  confirma(pagamento): Observable<any> {
    const url = pagamento._links.confirm.href;
    return this.http.put(url, null);
  }

  cancela(pagamento): Observable<any> {
    const url = pagamento._links.cancel.href;
    return this.http.delete(url, null);
  }

  private ajustaIds(pagamento) {
    pagamento.paymentMethodId = pagamento.paymentMethodId || pagamento.paymentMethod.id;
    pagamento.orderId = pagamento.pedidoId || pagamento.pedido.id;
  }

}
