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
      "informacion_adicional": "Información adicional sobre el gasto de vivienda",
      "path": "assets/vivienda.png"
    },
    {
      "id": 2,
      "tipo": "Salud",
      "descripcion": "Gasto relacionado con salud",
      "informacion_adicional": "Información adicional sobre el gasto de salud",
      "path": "assets/salud.png"
    },
    {
      "id": 3,
      "tipo": "Educacion",
      "descripcion": "Gasto relacionado con educación",
      "informacion_adicional": "Información adicional sobre el gasto de educación",
      "path": "assets/educacion.png"
    },
    {
      "id": 4,
      "tipo": "Vestimenta",
      "descripcion": "Gasto relacionado con vestimenta",
      "informacion_adicional": "Información adicional sobre el gasto de vestimenta",
      "path": "assets/vestimenta.png"
    },
    {
      "id": 5,
      "tipo": "Alimentacion",
      "descripcion": "Gasto relacionado con alimentacion",
      "informacion_adicional": "Información adicional sobre el gasto de alimentacion",
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
