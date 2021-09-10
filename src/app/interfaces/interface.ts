export interface SecretKeys {
  dentalinkKey: string;
  b2chatUser: string;
  b2ChatPass: string;
}

export interface WhatsAppLine {
  name: string;
  countryCode: number;
  lineNumber: number;
}
export interface WhatsAppTemplate {
  name: string;
  template: string;
}

export interface MainParams {
  secretKeysCompleted: boolean;
  selectedLine: number;
  campaignNote: string;
  selectedTemplate: string;
  selectedClinics: string[];
  appointmentsDate: string
}

// To parse this data:
//
//   import { Convert, DenatlinkClinics } from "./file";
//
//   const denatlinkClinics = Convert.toDenatlinkClinics(json);

export interface DentalinkClinics {
  links: string;
  data: Clinics[];
}

export interface Clinics {
  id: number;
  nombre: string;
  telefono: string;
  ciudad: string;
  comuna: string;
  direccion: string;
  habilitada: number;
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
  method: string;
}

export interface RequestOptions {
  method: 'GET';
  headers: Headers;
  redirect: 'follow';
}

//Citas

// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface DentalinkAppointments {
  links: Links;
  data:  Appointments[];
}

export interface Appointments {
  id:                  number;
  id_paciente:         number;
  nombre_paciente:     string;
  id_estado:           number;
  estado_cita:         EstadoCita;
  estado_anulacion:    number;
  estado_confirmacion: number;
  id_tratamiento:      number;
  nombre_tratamiento:  NombreTratamiento;
  id_dentista:         number;
  nombre_dentista:     string;
  id_sucursal:         number;
  nombre_sucursal:     string;
  id_sillon:           number;
  nombre_sillon:       NombreSillon;
  fecha:               Date;
  hora_inicio:         string;
  hora_fin:            string;
  duracion:            number;
  comentarios:         string;
  fecha_actualizacion: Date;
  links:               Link[];
}

export enum EstadoCita {
  CambioDeFecha = "Cambio de fecha",
  ConfirmadoEnSede = "Confirmado en Sede",
  ConfirmadoPorTeléfono = "Confirmado por teléfono",
  ConfirmadoPorWhatsApp = "Confirmado por WhatsApp",
  NoConfirmado = "No confirmado",
  NotificadoVíaWhatsapp = "Notificado vía Whatsapp",
}

export enum Method {
  Get = "GET",
}

export enum Rel {
  Dentistas = "dentistas",
  Pacientes = "pacientes",
  Self = "self",
  Tratamientos = "tratamientos",
}

export enum NombreSillon {
  Sillon1 = "Sillon 1",
  SobreAgendamiento = "Sobre Agendamiento",
}

export enum NombreTratamiento {
  Empty = "",
  NuevoPlanDeTratamiento = "Nuevo plan de tratamiento",
  Ortodocia = "ORTODOCIA",
  Reparación15 = "reparación 15",
}

export interface Links {
  current: string;
  next:    string;
}

// Converts JSON strings to/from your types
// export class Convert {
//   public static toWelcome(json: string): DentalinkAppointments {
//       return JSON.parse(json);
//   }

//   public static welcomeToJson(value: DentalinkAppointments): string {
//       return JSON.stringify(value);
//   }
// }

export interface AllAppointments {
  appointments: any
}