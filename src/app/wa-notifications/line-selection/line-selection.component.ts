import { Component } from '@angular/core';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { DentalinkQuerysService } from '../../services/dentalink-querys.service';

@Component({
  selector: 'app-line-selection',
  templateUrl: './line-selection.component.html',
  styleUrls: ['./line-selection.component.scss'],
})
export class LineSelectionComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService,
    private globalVariablesService: GlobalVariablesService) {}

  get mainParams() {
    return this.globalVariablesService.mainParams;
  }

  //Cuando tenga un backend las actualizo en el backend
  get whatsAppLines() {
    return this.globalVariablesService.whatsAppLines;
  }

  get componentVisibility() {
    return this.globalVariablesService.componentVisibility;
  }

  selectLine() {
    if (
      this.globalVariablesService.mainParams.selectedLine !== 0 &&
      this.globalVariablesService.mainParams.campaignNote !== ''
    ) {
      console.log(this.globalVariablesService.mainParams.selectedLine);
      console.log(this.globalVariablesService.mainParams.campaignNote);
      this.componentVisibility.lineSelection = false;
      this.componentVisibility.clinicsList = true;
    } else {
      alert('Selecciona una línea de WhatsApp y escribe una nota');
    }
  }
}
