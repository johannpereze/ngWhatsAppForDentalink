import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  DentalinkClinics,
  MainParams,
  SecretKeys,
  WhatsAppLine,
  WhatsAppTemplate,
} from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class DentalinkQuerysService {
  constructor(private http: HttpClient) {}

  secretKeys: SecretKeys = {
    dentalinkKey: '',
    b2chatUser: '',
    b2ChatPass: '',
  };

  whatsAppLines: WhatsAppLine[] = [
    {
      name: 'Notificaciones Prevenga',
      countryCode: 57,
      lineNumber: 3137544892,
    },
    {
      name: 'Chats Prevenga',
      countryCode: 57,
      lineNumber: 3137596945,
    },
  ];

  whatsAppTemplates: WhatsAppTemplate[] = [
    {
      name: 'recordatorio_cita_vigente_3',
      template:
        'Hola,  ${Var1}. Recuerda que tienes una cita odontológica en  ${Var2} el día  ${Var3} a las  ${Var4} con el/la Dr(a).  ${Var5}. No respondas a este WhatsApp, es sólo de notificaciones. Si tienes dudas con tu cita, contáctanos por nuestro WhatsApp principal: 3137596945 o nuestras Redes Sociales',
    },
  ];

  mainParams: MainParams = {
    secretKeysCompleted: false,
    selectedLine: 0,
    campaignNote: '',
    selectedTemplate: '',
  };

  saveKeys() {
    if (
      this.secretKeys.dentalinkKey.trim().length === 81 &&
      this.secretKeys.b2chatUser.trim().length === 0 && //poner este valor en 36 cuando las empiece a usar
      this.secretKeys.b2ChatPass.trim().length === 0 //poner este valor en 36 cuando las empiece a usar
    ) {
      this.mainParams.secretKeysCompleted = true;
    } else {
      alert('Claves incompletas');
    }
    console.log(this.secretKeys); //borrar por seguridad
  }



  getClinics() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${this.secretKeys.dentalinkKey}`
    );
    return this.http.get<DentalinkClinics>(
      'https://api.dentalink.healthatom.com/api/v1/sucursales/',
      { headers }
    );
  }
}
