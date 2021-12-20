import { Injectable } from '@angular/core';
import { DentalinkQuerysService } from './dentalink-querys.service';
import { B2ChatToken, BroadcastData } from '../interfaces/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppQuerysService {
  constructor(
    private globalVariablesService: GlobalVariablesService,
    private http: HttpClient
  ) { }

  private proxyUrl: string = environment.proxyUrl;

  get secretKeys() {
    return this.globalVariablesService.secretKeys;
  }

  getWhatsAppToken() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    console.log(
      'Obteniendo token de whatsapp.... Recuerda que si no se hacen peticiones al backend por más de 30 minutos, entra en estado de hibernación y la siguiente petición tardará más. Por favor espera...'
    );

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
        `Bearer ${this.globalVariablesService.secretKeys.b2ChatToken}`
      );
    console.log(headers);
    console.log(body);
    return this.http.post<B2ChatToken>(
      `${this.proxyUrl}/broadcast`,
      JSON.stringify(body),
      { headers }
    );
  }
}
