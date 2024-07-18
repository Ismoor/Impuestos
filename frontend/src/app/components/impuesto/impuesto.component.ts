import { Component } from '@angular/core';
import { Impuesto } from '../../modelos/impuesto'
import { ImpuestoService } from '../../services/impuesto.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent {
  cedula: string = '';
  sueldo: number = 0;
  deducciones_salud: number = 0;
  deducciones_educacion: number = 0;
  deducciones_vestimenta: number = 0;
  deducciones_vivienda: number = 0;
  deducciones_alimentacion: number = 0;
  impuesto: number | null = null;
  deduccionMaxima: number = 15238.60;
  totalDeducciones: number = 0;
  baseImponible: number = 0;
  excedente: number = 0;
  renta: number = 0;

  constructor(private impuestoService: ImpuestoService,private router:Router) {
   }

  ngOnInit(): void { }

  validacion(): boolean {
    const cedulaRegex = /^\d{10}$/;
    if (!cedulaRegex.test(this.cedula)) {
      alert("Error, ingrese un número de cédula válido de 10 dígitos");
      return false;
    }

    if (isNaN(this.sueldo) || this.sueldo <= 0 ) {
      alert("Error, ingrese un sueldo anual válido");
      return false;
    }

    if (isNaN(this.deducciones_salud) || this.deducciones_salud < 0  || this.deducciones_salud>this.deduccionMaxima) {
      alert("Error, ingrese un valor válido para gastos en salud");
      return false;
    }

    if (isNaN(this.deducciones_educacion) || this.deducciones_educacion < 0  || this.deducciones_educacion>3500) {
      alert("Error, ingrese un valor válido para gastos en educación");
      return false;
    }

    if (isNaN(this.deducciones_vestimenta) || this.deducciones_vestimenta < 0  || this.deducciones_vestimenta>3500) {
      alert("Error, ingrese un valor válido para gastos en vestimenta");
      return false;
    }

    if (isNaN(this.deducciones_vivienda) || this.deducciones_vivienda < 0  || this.deducciones_vivienda>3500 ) {
      alert("Error, ingrese un valor válido para gastos en vivienda");
      return false;
    }

    if (isNaN(this.deducciones_alimentacion) || this.deducciones_alimentacion < 0  || this.deducciones_alimentacion>3500) {
      alert("Error, ingrese un valor válido para gastos en alimentación ");
      return false;
    }

    return true;
  }

  calcularBaseImponible(): void {
    if (this.validacion()) {
      this.totalDeducciones = this.deducciones_salud + this.deducciones_educacion + this.deducciones_vestimenta + this.deducciones_vivienda + this.deducciones_alimentacion;
      if (this.totalDeducciones > this.deduccionMaxima) {
        alert ("el valor maximo de deduciones a sido sobrepasado 15238.60")
        return 
      }
      this.baseImponible = this.sueldo - this.totalDeducciones;
      console.log("total deduciones",this.totalDeducciones)
      console.log("Base Imponible:", this.baseImponible);
    }
  }

  onSubmit(): void {
    this.calcularBaseImponible();
    
    const tablaImpuesto = [
      { base: 0, exceso: 11722, impuestoBasico: 0, porcentajeExcedente: 0 },
      { base: 11722, exceso: 14930, impuestoBasico: 0, porcentajeExcedente: 0.05 },
      { base: 14930, exceso: 19385, impuestoBasico: 160, porcentajeExcedente: 0.10 },
      { base: 19385, exceso: 25638, impuestoBasico: 606, porcentajeExcedente: 0.12 },
      { base: 25638, exceso: 33738, impuestoBasico: 1356, porcentajeExcedente: 0.15 },
      { base: 33738, exceso: 44721, impuestoBasico: 2571, porcentajeExcedente: 0.20 },
      { base: 44721, exceso: 59537, impuestoBasico: 4768, porcentajeExcedente: 0.25 },
      { base: 59537, exceso: 79388, impuestoBasico: 8472, porcentajeExcedente: 0.30 },
      { base: 79388, exceso: 105580, impuestoBasico: 14427, porcentajeExcedente: 0.35 },
      { base: 105580, exceso: Infinity, impuestoBasico: 23594, porcentajeExcedente: 0.37 }
    ];

    for (const rango of tablaImpuesto) {
      if (this.baseImponible > rango.base && this.baseImponible <= rango.exceso) {
        this.excedente = this.baseImponible - rango.base;
        this.renta = rango.impuestoBasico + (this.excedente * rango.porcentajeExcedente);
        break;
      }
    }
    console.log("Impuesto a la renta:", this.renta);
    this.crearImpuesto();
  }
  crearImpuesto(): void {
    const impuesto: Impuesto = {
      ingresoAnual: this.sueldo,
      totalGastos: this.totalDeducciones,
      impuestoCalculado: this.renta,
      fecha: new Date()
    };
    console.log (impuesto);
    this.impuestoService.createImpuestos(impuesto,this.cedula).subscribe(
      ()=>{
        console.log("Impuesto creado")
        this.router.navigate(['/reporte'])
      },
      error=>{
        console.log("Error al crear impuesto")
      }
    )
  }
}
