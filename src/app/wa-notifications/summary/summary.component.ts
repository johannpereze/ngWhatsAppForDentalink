import { Component } from '@angular/core';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
}
