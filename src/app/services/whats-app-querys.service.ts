import { Injectable } from '@angular/core';
import { DentalinkQuerysService } from './dentalink-querys.service';
import {
  Appointment,
  B2ChatToken,
  BroadcastData,
  SecretKeys,
} from '../interfaces/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppQuerysService {
  constructor(
    private dentalinkQuerysService: DentalinkQuerysService,
    private http: HttpClient
  ) {}

  private proxyUrl: string = environment.proxyUrl

  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }
  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get allAppointments() {
    return this.dentalinkQuerysService.allAppointments;
  }

  // whatsAppToken: B2ChatToken = {
  //   access_token: 'b',
  //   token_type: '',
  //   expires_in: 0,
  //   scope: '',
  // };

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
      // .set('Authorization', `Token ${this.secretKeys.dentalinkKey}`)

      .set('Content-Type', 'application/x-www-form-urlencoded');
    console.log('Obteniendo token de whatsapp.... Recuerda que si no se hacen peticiones al backend por más de 30 minutos, entra en estado de hibernación y la siguiente petición tardará más. Por favor espera...');

    return this.http.post<B2ChatToken>(
      `  ${this.proxyUrl}/oauth/token?grant_type=client_credentials`,
      { headers }
    );
  }

  sendWhatsAppBroadcast(body: BroadcastData) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        `Bearer ${this.dentalinkQuerysService.secretKeys.b2ChatToken}`
      );
    console.log(headers);
    console.log(body);
    return this.http.post<B2ChatToken>(
        `${this.proxyUrl}/broadcast`,
      JSON.stringify(body),
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
    console.log('valuesArray', valuesArray);

    return valuesArray;
  }

  getBodyParams(appointment: Appointment) {
    //primero obtenemos todos los parámetros
    const broadcastData: BroadcastData = {
      from: `+${this.mainParams.selectedLine}`,
      to: `+${'573192161411'}`,
      contact_name: appointment.nombre_paciente,
      template_name: this.mainParams.selectedTemplateName,
      campaign_name: this.mainParams.campaignNote,
      values: [...WhatsAppQuerysService.getBroadcastValues(appointment)],
    };
    console.log('broadcastData', broadcastData);
    return broadcastData;
  }
}

//Debo seguir avanzando tomando el token desde postman
//Este servicio no funciona por cors policy y preflight. Al parecer tendré que montar un servidor que haga el request para que no intervenga el navegador y su CORS policy
