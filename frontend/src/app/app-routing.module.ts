import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ImpuestoComponent } from './components/impuesto/impuesto.component';
import { RegistroComponent } from './components/registro/registro.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'factura', component: FormularioComponent },
  { path: 'impuesto', component: ImpuestoComponent },
  { path: 'registro', component: RegistroComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
