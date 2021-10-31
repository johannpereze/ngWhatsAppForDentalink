import { Component, OnInit } from '@angular/core';
import { DentalinkQuerysService } from '../../services/dentalink-querys.service';

@Component({
  selector: 'app-line-selection',
  templateUrl: './line-selection.component.html',
  styleUrls: ['./line-selection.component.scss'],
})
export class LineSelectionComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }

  //Cuando tenga un backend las actualizo en el backend
  get whatsAppLines() {
    return this.dentalinkQuerysService.whatsAppLines;
  }
  get componentVisibility() {
    return this.dentalinkQuerysService.componentVisibility;
  }

  //Esta función no se necesita. Simplemente es para ver que sí se guardó la info en mainparams pero la puedo borrar para producción
  selectLine() {
    if (
      this.mainParams.selectedLine !== 0 &&
      this.mainParams.campaignNote !== ''
    ) {
      console.log(this.mainParams.selectedLine);
      console.log(this.mainParams.campaignNote);
      this.componentVisibility.lineSelection = false;
      this.componentVisibility.clinicsList = true;
    } else {
      alert('Selecciona una línea de WhatsApp y escribe una nota');
    }
  }

 
}
