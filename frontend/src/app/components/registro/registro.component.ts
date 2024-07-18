import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../modelos/usuario";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombres: string = "";
  apellidos: string = "";
  cedula: string = "";
  telefono: string = "";
  reg_email: string = "";
  reg_password: string = "";

  mensajeExito: string = "";
  mensajeError: string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  registro() {
    const newUser: Usuario = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      cedula: this.cedula,
      telefono: this.telefono,
      correo: this.reg_email,
      password: this.reg_password,
    };

    this.loginService.registroUsuario(newUser).subscribe(
      (response) => {
        console.log("Usuario registrado:", response);
        this.mensajeExito = "Usuario registrado exitosamente.";
        this.mensajeError = ""; // Limpiar mensaje de error
        // Redirigir al login después de un pequeño retraso para mostrar el mensaje de éxito
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error("Error al registrar usuario:", error);
        this.mensajeError = "Error al registrar usuario. Inténtalo de nuevo.";
        this.mensajeExito = ""; // Limpiar mensaje de éxito
      }
    );
  }
}
