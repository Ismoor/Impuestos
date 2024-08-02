import { ChangeDetectionStrategy, Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { Impuesto } from "../../modelos/impuesto";
import { ImpuestoService } from "../../services/impuesto.service";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteComponent implements OnInit {
  cedula: string = "";
  impuestos: Impuesto[] = [];

  constructor(
    private impuestosServices: ImpuestoService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.verImpuestos();
    }
  }

  verImpuestos() {
    console.log("la cedula es", this.cedula);
    this.impuestosServices.getImpuestos(this.cedula).subscribe((data) => {
      this.impuestos = data;
      console.log("impuestos", this.impuestos);
    });
  }
}
