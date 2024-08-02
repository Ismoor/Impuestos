/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gasto } from '../modelos/gasto';
import { Observable } from 'rxjs';

const configUrl = 'http://18.220.242.169:3003/gastos';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http está funcionando…');
  }

  obtenerDatos(): Observable<Gasto[]> {
    return this.httpclient.get<Gasto[]>(configUrl);
  }

  agregarGasto(gasto: Gasto): Observable<Gasto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpclient.post<Gasto>(configUrl, gasto, { headers });
  }
}
*/