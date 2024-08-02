import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Impuesto} from '../../app/modelos/impuesto'

@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {
  private impuestosURL = 'http://http://18.220.242.169:3003/api/v1/impuestos'; 

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }
  getImpuestos(cedula: string): Observable<Impuesto[]> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    
    const url = `${this.impuestosURL}/${cedula}`;
    console.log("La url es",url)
    return this.http.get<Impuesto[]>(url,{headers});
  };
  createImpuestos(impuesto:Impuesto, cedula:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    
    const url = `${this.impuestosURL}/${cedula}`;
    console.log("La url es",url)
    return this.http.post<{token:string}>(url,impuesto,{headers})
  }
}
