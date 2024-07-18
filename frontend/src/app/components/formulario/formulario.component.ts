import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../modelos/gasto';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  ruc: string = '';
  valor: number = 0.0;
  tipo: string = 'Ninguno';
  facturaJSON: string = '';
  maxId: number = 0;

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.gastoService.obtenerDatos().subscribe(gastos => {
      this.maxId = gastos.length > 0 ? Math.max(...gastos.map(g => g.id)) : 0;
    });
  }

  onSubmit() {
    const newId = ++this.maxId;
    const factura = {
      id: newId,
      tipo: this.tipo,
      ruc: this.ruc,
      valor: this.valor
    };

    this.facturaJSON = JSON.stringify(factura);
    console.log('Factura guardada en JSON:', this.facturaJSON);
    this.gastoService.agregarGasto(factura).subscribe(response => {
      console.log('Gasto agregado:', response);
      // Optionally, reset the form or provide user feedback
    });
  }
}
