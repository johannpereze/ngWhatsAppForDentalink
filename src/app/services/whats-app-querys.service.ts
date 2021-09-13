import { Injectable } from '@angular/core';
import { DentalinkQuerysService } from './dentalink-querys.service';
import {
  Appointment,
  B2ChatToken,
  BroadcastData,
  SecretKeys,
} from '../interfaces/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppQuerysService {
  constructor(
    private dentalinkQuerysService: DentalinkQuerysService,
    private http: HttpClient
  ) {}

  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }
  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get allAppointments() {
    return this.dentalinkQuerysService.allAppointments;
  }

  whatsAppToken: B2ChatToken = {
    access_token: 'b',
    token_type: '',
    expires_in: 0,
    scope: '',
  };

  // broadcastData: BroadcastData = {
  // from:`+${this.dentalinkQuerysService.mainParams.selectedLine}`,
  // to:"+57300xxxxxxx",
  // contact_name:"Mark",
  // template_name:"christmas_evening",
  // campaign_name:"christmas campaign",
  // values: ["Agent John","Contact Mark"]
  // }

  getWhatsAppToken() {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.secretKeys.dentalinkKey}`)
      .set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(headers);

    return this.http.put<B2ChatToken>(
      'https://api.b2chat.io/oauth/token?grant_type=client_credentials',
      { headers }
    );
  }

  static getBroadcastValues(appointment: Appointment) {
    const valuesArray: string[] = [];
    valuesArray.push(appointment.nombre_paciente);
    valuesArray.push(appointment.nombre_sucursal);
    valuesArray.push(appointment.fecha);
    valuesArray.push(appointment.hora_inicio);
    valuesArray.push(appointment.nombre_dentista);
    console.log(valuesArray);

    return valuesArray;
  }

  sendBroadcast() {
    const broadcastData: BroadcastData = {
      from: `+${this.mainParams.selectedLine}`,
      to: '',
      contact_name: '',
      template_name: this.mainParams.selectedTemplateName,
      campaign_name: this.mainParams.campaignNote,
      values: [],
    };
    this.allAppointments.appointments.forEach((element) => {
      broadcastData.to = `+${'Pendiente'}`;
      broadcastData.contact_name = element.nombre_paciente;
      broadcastData.values.push(...(WhatsAppQuerysService.getBroadcastValues(element)));
      console.log(broadcastData);
    });
  }
}

//Debo seguir avanzando tomando el token desde postman
//Este servicio no funciona por cors policy y preflight. Al parecer tendré que montar un servidor que haga el request para que no intervenga el navegador y su CORS policy
