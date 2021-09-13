import { Injectable } from '@angular/core';
import { DentalinkQuerysService } from './dentalink-querys.service';
import { B2ChatToken, SecretKeys } from '../interfaces/interface';
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

  whatsAppToken: B2ChatToken = {
    "access_token": "b",
    "token_type": "",
    "expires_in": 0,
    "scope": ""
};

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
}

//Debo seguir avanzando tomando el token desde postman
//Este servicio no funciona por cors policy y preflight. Al parecer tendré que montar un servidor que haga el request para que no intervenga el navegador y su CORS policy