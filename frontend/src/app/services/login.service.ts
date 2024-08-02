import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Usuario } from "../modelos/usuario";
import { UsuarioLogin } from "../modelos/usuarioLogin";
import { LocalStorageService } from './local-storage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private getUsuariosURL = "http://18.220.242.169:3003/api/v1/usuarios";
  private regUser = "http://18.220.242.169:3003/api/v1/registro";
  private loginUrl = "http://18.220.242.169:3003/api/v1/login";

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
    private localStorageService: LocalStorageService
  ) {}

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
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.setItem("authToken", token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.localStorageService.getItem("authToken");
    }
    return null;
  }

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.removeItem("authToken");
    }
  }
}
