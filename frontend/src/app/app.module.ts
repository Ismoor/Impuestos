import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ImpuestoComponent } from './components/impuesto/impuesto.component';
import { GastoService } from './services/gasto.service';
import { UserService } from './services/user.service';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginService } from './services/login.service';
import { LoginComponent } from './components/login/login.component';

  

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InformacionComponent,
    FormularioComponent,
    ReporteComponent,
    ImpuestoComponent,
    RegistroComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [
    provideClientHydration(),
    GastoService,
    UserService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
