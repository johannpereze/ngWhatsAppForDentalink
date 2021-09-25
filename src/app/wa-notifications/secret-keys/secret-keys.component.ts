import { Component } from '@angular/core';
import { Appointment, BroadcastData } from 'src/app/interfaces/interface';
import { WhatsAppQuerysService } from 'src/app/services/whats-app-querys.service';
import { DentalinkQuerysService } from '../../services/dentalink-querys.service';

@Component({
  selector: 'app-secret-keys',
  templateUrl: './secret-keys.component.html',
  styleUrls: ['./secret-keys.component.scss'],
})
export class SecretKeysComponent {
  constructor(
    private dentalinkQuerysService: DentalinkQuerysService,
    private whatsAppQuerysService: WhatsAppQuerysService
  ) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }
  get saveKeys() {
    return this.dentalinkQuerysService.saveKeys;
  }
  get allAppointments() {
    return this.dentalinkQuerysService.allAppointments;
  }

  // Bloqueado por CORS policy
  getWhatsAppToken() {
    this.whatsAppQuerysService.getWhatsAppToken().subscribe((response) => {
      // this.whatsAppQuerysService.whatsAppToken = response;
      this.dentalinkQuerysService.secretKeys.b2ChatToken = response.access_token
      console.log(this.dentalinkQuerysService.secretKeys.b2ChatToken);
    });
  }
}
