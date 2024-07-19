// informacion.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  gastos = [
    {
      "id": 1,
      "tipo": "Vivienda",
      "descripcion": "Gasto relacionado con vivienda",
      "informacion_adicional": "Se pueden deducir los intereses de préstamos hipotecarios, el pago de arriendo y servicios básicos como electricidad y agua.",
      "path": "assets/vivienda.png"
    },
    {
      "id": 2,
      "tipo": "Salud",
      "descripcion": "Gasto relacionado con salud",
      "informacion_adicional": "Los gastos deducibles incluyen consultas médicas, servicios hospitalarios, medicamentos y primas de seguro médico. Las membresías de gimnasio también son deducibles por contribuir al bienestar físico​.",
      "path": "assets/salud.png"
    },
    {
      "id": 3,
      "tipo": "Educacion",
      "descripcion": "Gasto relacionado con educación",
      "informacion_adicional": "Se pueden deducir las matrículas, útiles escolares, y talleres o seminarios educativos. Esto abarca todos los niveles educativos, desde el cuidado infantil hasta la educación superior​",
      "path": "assets/educacion.png"
    },
    {
      "id": 4,
      "tipo": "Vestimenta",
      "descripcion": "Gasto relacionado con vestimenta",
      "informacion_adicional": "Los gastos en ropa para dependientes son deducibles, siempre y cuando no tengan ingresos propios​.",
      "path": "assets/vestimenta.png"
    },
    {
      "id": 5,
      "tipo": "Alimentacion",
      "descripcion": "Gasto relacionado con alimentacion",
      "informacion_adicional": "ILos gastos en alimentación dentro de Ecuador son deducibles, especialmente si están relacionados con el turismo interno",
      "path": "assets/alimentacion.png"
    }         
  ];

  deducibles = ['Vivienda', 'Salud', 'Educacion', 'Vestimenta', 'Alimentacion'];

  constructor() {}

  ngOnInit(): void {}

  informacion(deducible: string) {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    if (gasto) {
      alert('Esta es información adicional sobre ' + deducible + ': ' + gasto.informacion_adicional);
    }
  }

  borrar(deducible: string) {
    const index = this.deducibles.indexOf(deducible);
    if (index !== -1) {
      this.deducibles.splice(index, 1);
    }
  }
  descripcion(deducible: string): string {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    return gasto ? gasto.descripcion : '';
  }
  
  infoAdicional(deducible: string): string {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    return gasto ? gasto.informacion_adicional : '';
  }
  
  getPath(deducible: string): string {
    const gasto = this.gastos.find(g => g.tipo === deducible);
    return gasto ? gasto.path : 'hola';
  }
}
