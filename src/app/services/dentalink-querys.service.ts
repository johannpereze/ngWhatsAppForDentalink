import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AllAppointments,
  AppointmentsIds,
  DentalinkAppointments,
  DentalinkClinics,
  MainParams,
  Patient,
  SecretKeys,
  WhatsAppLine,
  WhatsAppTemplate,
} from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class DentalinkQuerysService {
  constructor(private http: HttpClient) {}

  //Con estos parámetros voy a hacer la query a los endpoints
  //Lo usa secretKeys
  mainParams: MainParams = {
    secretKeysCompleted: false,
    selectedLine: 0,
    campaignNote: '',
    selectedTemplateName: '',
    selectedTemplateTemplate: '',
    selectedClinics: [],
    appointmentsDate: '2022-10-01', //2022-10-01 puse esta fecha para hacer pruebas y que no descargue siempre 600 citas
  };

  validAppointmentIds: AppointmentsIds[] = [
    { id: 3, appointmentState: 'Confirmado por teléfono' },
    { id: 7, appointmentState: 'No confirmado' },
    { id: 11, appointmentState: 'Confirmado por email' },
    { id: 12, appointmentState: 'Notificado via email' },
    { id: 13, appointmentState: 'Agenda Online' },
    { id: 15, appointmentState: 'Confirmado por WhatsApp' },
    { id: 17, appointmentState: 'Confirmado 8 días' },
    { id: 19, appointmentState: 'Confirmado en Sede' },
  ];

  //Estas keys en el futuro se debería almacenar en el backend
  //dentalinkKey Se guarda desde secret keys component con el método savekeys
  //b2ChatToken Se obtiene desde el backend
  secretKeys: SecretKeys = {
    dentalinkKey: '',
    b2ChatToken: '',
  };

  //Cuando tenga una base de datos las paso de aquí al backend
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

  allAppointments: AllAppointments = {
    appointments: [
      {
        nombre_paciente: "'Nombre Paciente'",
        nombre_sucursal: "'Sede Prevenga'",
        fecha: "'Fecha de Cita'",
        hora_inicio: "'Hora de Cita'",
        nombre_dentista: "'Nombre odontólogo'",
        whatsApp: '0',//Ojo, debe ser numero
      },
    ],
  };

  whatsAppTemplates: WhatsAppTemplate[] = [
    //este template ya está en desuso
    // {
    //   name: 'recordatorio_cita_vigente_3',
    //   template:
    //     'Hola, ${Var1}. Recuerda que tienes una cita odontológica en  ${Var2} el día  ${Var3} a las  ${Var4} con el/la Dr(a).  ${Var5}. No respondas a este WhatsApp, es sólo de notificaciones. Si tienes dudas con tu cita, contáctanos por nuestro WhatsApp principal: 3137596945 o nuestras Redes Sociales',
    // },
    {
      name: 'recordatorio_cita_vigente_4',
      template: `Hola, ${this.allAppointments.appointments[0].nombre_paciente}. Recuerda que tienes una cita odontológica en ${this.allAppointments.appointments[0].nombre_sucursal} el día ${this.allAppointments.appointments[0].fecha} a las  ${this.allAppointments.appointments[0].hora_inicio} con el/la Dr(a). ${this.allAppointments.appointments[0].nombre_dentista}.  Si tienes dudas con tu cita, contáctanos por nuestro WhatsApp principal: 3137596945 o nuestras Redes Sociales. *NO RESPONDAS a este WhatsApp, es sólo de notificaciones y no recibiremos tu mensaje.*`,
    },
  ];

  // clinicsApiResponse: DentalinkClinics = {
  //   links: '',
  //   data: [],
  // }; ESTE ESTA EN CLINICS-LIST

  // appointmentsUrl: string = `https://api.dentalink.healthatom.com/api/v1/citas?q={"fecha":{"eq":"${this.mainParams.appointmentsDate}"}}`;

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

  getAppointments(url: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${this.secretKeys.dentalinkKey}`
    );
    return this.http.get<DentalinkAppointments>(url, { headers });
  }
  getWANumbers(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${this.secretKeys.dentalinkKey}`
    );
    return this.http.get<Patient>(`https://api.dentalink.healthatom.com/api/v1/pacientes/${id}`, { headers });
  }
}
