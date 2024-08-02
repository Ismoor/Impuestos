import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Impuesto } from '../modelos/impuesto';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {
  private impuestosURL = 'http://18.220.242.169:3003/api/v1/impuestos'; 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
    private localStorageService: LocalStorageService
  ) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.localStorageService.getItem("authToken");
    }
    return null;
  }

  getImpuestos(cedula: string): Observable<Impuesto[]> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : ''
      });
      
      const url = `${this.impuestosURL}/${cedula}`;
      console.log("La url es", url);
      return this.http.get<Impuesto[]>(url, { headers });
    } else {
      // Evitar hacer la solicitud en el servidor
      console.warn("No se puede realizar la solicitud en el servidor");
      return of([] as Impuesto[]);
    }
  }

  createImpuestos(impuesto: Impuesto, cedula: string): Observable<{ token: string }> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? 'Bearer ' + token : ''
      });
      
      const url = `${this.impuestosURL}/${cedula}`;
      console.log("La url es", url);
      return this.http.post<{ token: string }>(url, impuesto, { headers });
    } else {
      // Evitar hacer la solicitud en el servidor
      console.warn("No se puede realizar la solicitud en el servidor");
      return of({ token: '' });
    }
  }
}
