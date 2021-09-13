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

  // getBroadcastValues(appointment: Appointment) {
  //   const valuesArray: string[] = [];
  //   valuesArray.push(appointment.nombre_paciente);
  //   valuesArray.push(appointment.nombre_sucursal);
  //   valuesArray.push(appointment.fecha);
  //   valuesArray.push(appointment.hora_inicio);
  //   valuesArray.push(appointment.nombre_dentista);
  //   return valuesArray;
  // }

  // sendBroadcast() {
  //   const broadcastData: BroadcastData = {
  //     from: `+${this.mainParams.selectedLine}`,
  //     to: '',
  //     contact_name: '',
  //     template_name: this.mainParams.selectedTemplateName,
  //     campaign_name: this.mainParams.campaignNote,
  //     values: [''],
  //   };
  //   this.allAppointments.appointments.forEach((element) => {
  //     broadcastData.to = `+${'Pendiente'}`;
  //     broadcastData.contact_name = element.nombre_paciente;
  //     broadcastData.values = this.getBroadcastValues(element);
  //     console.log(broadcastData);
  //   });
  // }

  //Bloqueado por CORS policy
  // getWhatsAppToken() {
  //   this.whatsAppQuerysService.getWhatsAppToken().subscribe((response) => {
  //     this.whatsAppQuerysService.whatsAppToken = response;
  //     console.log(this.whatsAppQuerysService.whatsAppToken);
  //   });
  // }
}
