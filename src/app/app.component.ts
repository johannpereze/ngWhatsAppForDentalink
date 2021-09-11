import { Component } from '@angular/core';
import {
  AllAppointments,
  DentalinkAppointments,
  DentalinkClinics,
} from './interfaces/interface';
import { DentalinkQuerysService } from './services/dentalink-querys.service';
import { Appointments } from './interfaces/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}
  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
}
