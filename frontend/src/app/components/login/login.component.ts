import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsuarioLogin } from "../../modelos/usuarioLogin";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit{
  email: string = "";
  password: string = "";
  constructor(private loginService: LoginService, private router:Router) {
  }
  ngOnInit(): void {}
  
  logIn(): void {
    const loginUser: UsuarioLogin = {
      correo: this.email,
      password: this.password
    };
    console.log(loginUser)
    this.loginService.logIn(loginUser).subscribe(
      () => {
        console.log('Log In successful'); 
        this.router.navigate(['/reporte'])
      },
      error => {
        console.error('Log In failed:', error);
      }
    );
  }
}
