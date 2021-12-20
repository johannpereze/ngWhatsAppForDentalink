import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllAppointments, AppointmentsIds, ComponentVisibility, MainParams, SecretKeys, WhatsAppLine, WhatsAppTemplate } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  constructor(private http: HttpClient) { }

  //TODO: HACER UN SERVICIO PARA ESTOS MAIN PARAMS Y SECRET KEYS
  //dentalinkKey Se guarda desde secret keys component con el método savekeys
  //b2ChatToken Se obtiene desde el backend
  secretKeys: SecretKeys = {
    dentalinkKey: '',
    b2ChatToken: '',
    b2ChatExpiration: '0',
  };

  //Con estos parámetros voy a hacer la query a los endpoints
  //Lo usa secretKeys
  date = new Date
  mainParams: MainParams = {
    secretKeysCompleted: false,
    selectedLine: 0,
    campaignNote: '',
    selectedTemplateName: '',
    selectedTemplateTemplate: '',
    selectedClinics: [],
    appointmentsDate: this.date.toLocaleDateString("fr-CA") //2022-10-01 puse esta fecha para hacer pruebas y que no descargue siempre 600 citas. Idealmente debería seleccionar 2 días en el futuro, teniendo en cuenta domingos y festivos
  };

  //TODO: TAMPOCO PERTENECE A ESTE SERVICIO
  validAppointmentIds: AppointmentsIds[] = [
    { id: 3, appointmentState: 'Confirmado por teléfono' },
    { id: 7, appointmentState: 'No confirmado' },
    { id: 11, appointmentState: 'Confirmado por email' },
    { id: 12, appointmentState: 'Notificado via email' },
    { id: 13, appointmentState: 'Agenda Online' },
    { id: 15, appointmentState: 'Confirmado por WhatsApp' },
    { id: 17, appointmentState: 'Confirmado 8 días' },
    { id: 19, appointmentState: 'Confirmado en Sede' },
    { id: 24, appointmentState: 'Notificado vía WhatsApp' },
  ];

  // TODO: Sacar todo lo relacionado con vistas a un servicio independiente
  //DESDE AQUÍ...

  componentVisibility: ComponentVisibility = {
    secretKeys: true,
    lineSelection: false,
    clinicsList: false,
    templateSelection: false,
    summary: false,
    progressBarIndeterminatedShow: true,
    progressBarDynamicShow: false,
    progressBarLabel: 'Buscando Citas',
  };

  loadButtonDisabled = true;
  loadButtonText = 'Buscando citas';

  //HASTA AQUÍ



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
    appointmentsWitoutValidation: [
      {
        //Los tengo entre comillas dobles y luego simples para facilitar el splice
        nombre_paciente: "'Nombre SIN VALIDAR'",
        nombre_sucursal: "'Sede SIN VALIDAR'",
        fecha: "'Fecha de Cita'",
        hora_inicio: "'Hora de Cita'",
        nombre_dentista: "'Nombre odontólogo'",
        whatsApp: "'0'", //Ojo, debe ser numero
      },
    ],
    appointments: [
      {
        //Los tengo entre comillas dobles y luego simples para facilitar el splice
        nombre_paciente: "'Nombre Paciente'",
        nombre_sucursal: "'Sede Prevenga'",
        fecha: "'Fecha de Cita'",
        hora_inicio: "'Hora de Cita'",
        nombre_dentista: "'Nombre odontólogo'",
        whatsApp: "'0'", //Ojo, debe ser numero
      },
    ],
  };

  whatsAppTemplates: WhatsAppTemplate[] = [
    //Para agregar nuevos templates se debe agregar como el siguiente:
    {
      name: 'recordatorio_cita_vigente_4',
      template: `Hola, ${this.allAppointments.appointments[0].nombre_paciente}. Recuerda que tienes una cita odontológica en ${this.allAppointments.appointments[0].nombre_sucursal} el día ${this.allAppointments.appointments[0].fecha} a las  ${this.allAppointments.appointments[0].hora_inicio} con el/la Dr(a). ${this.allAppointments.appointments[0].nombre_dentista}.  Si tienes dudas con tu cita, contáctanos por nuestro WhatsApp principal: 3137596945 o nuestras Redes Sociales. *NO RESPONDAS a este WhatsApp, es sólo de notificaciones y no recibiremos tu mensaje.*`,
    },
  ];
}
