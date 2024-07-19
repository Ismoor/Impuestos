import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usuario } from "../modelos/usuario";
import { UsuarioLogin } from "../modelos/usuarioLogin";
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private getUsuariosURL = "http://localhost:3000/api/v1/usuarios";
  private regUser = "http://localhost:3000/api/v1/registro";
  private loginUrl = "http://localhost:3000/api/v1/login";

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getUsuariosURL);
  }

  registroUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.regUser, usuario);
  }
  
  logIn(userLogin: UsuarioLogin): Observable<void> {
    return this.http.post<{ token: string }>(this.loginUrl, userLogin).pipe(
      map((response) => {
        this.saveToken(response.token);
      })
    );
  }

  saveToken(token: string): void {
    this.localStorageService.setItem("authToken", token);
  }

  getToken(): string | null {
    return this.localStorageService.getItem("authToken");
  }

  logOut(): void {
    this.localStorageService.removeItem("authToken");
  }
}
