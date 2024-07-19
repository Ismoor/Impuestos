import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Impuesto } from "../../modelos/impuesto";
import { ImpuestoService } from "../../services/impuesto.service";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ReporteComponent implements OnInit {
  cedula: string = "";
  impuestos: Impuesto[] = [];
  constructor(private impuestosServices: ImpuestoService) {
  }
  ngOnInit(): void {
    this.verImpuestos();
  }
  verImpuestos() {
    console.log("la cedula es",this.cedula)
    this.impuestosServices.getImpuestos(this.cedula).subscribe((data) => {
      this.impuestos = data;
      console.log("impuestos", this.impuestos);
    });
  }
}
