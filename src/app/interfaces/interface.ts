export interface SecretKeys {
  dentalinkKey: string;
  b2ChatToken: string;
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
  selectedTemplateName: string;
  selectedTemplateTemplate: string;
  selectedClinics: string[];
  appointmentsDate: string;
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
  data: Appointments[];
}

export interface Appointments {
  id: number;
  id_paciente: number;
  nombre_paciente: string;
  id_estado: number;
  estado_cita: EstadoCita;
  estado_anulacion: number;
  estado_confirmacion: number;
  id_tratamiento: number;
  nombre_tratamiento: NombreTratamiento;
  id_dentista: number;
  nombre_dentista: string;
  id_sucursal: number;
  nombre_sucursal: string;
  id_sillon: number;
  nombre_sillon: NombreSillon;
  fecha: Date;
  hora_inicio: string;
  hora_fin: string;
  duracion: number;
  comentarios: string;
  fecha_actualizacion: Date;
  links: Link[];
}

export enum EstadoCita {
  CambioDeFecha = 'Cambio de fecha',
  ConfirmadoEnSede = 'Confirmado en Sede',
  ConfirmadoPorTeléfono = 'Confirmado por teléfono',
  ConfirmadoPorWhatsApp = 'Confirmado por WhatsApp',
  NoConfirmado = 'No confirmado',
  NotificadoVíaWhatsapp = 'Notificado vía Whatsapp',
}

export enum Method {
  Get = 'GET',
}

export enum Rel {
  Dentistas = 'dentistas',
  Pacientes = 'pacientes',
  Self = 'self',
  Tratamientos = 'tratamientos',
}

export enum NombreSillon {
  Sillon1 = 'Sillon 1',
  SobreAgendamiento = 'Sobre Agendamiento',
}

export enum NombreTratamiento {
  Empty = '',
  NuevoPlanDeTratamiento = 'Nuevo plan de tratamiento',
  Ortodocia = 'ORTODOCIA',
  Reparación15 = 'reparación 15',
}

export interface Links {
  current: string;
  next: string;
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
  appointments: Appointment[];
}

export interface Appointment {
  id?: number;
  id_paciente?: number;
  nombre_paciente: string;
  id_estado?: number;
  estado_cita?: string;
  estado_anulacion?: number;
  estado_confirmacion?: number;
  id_tratamiento?: number;
  nombre_tratamiento?: string;
  id_dentista?: number;
  nombre_dentista: string;
  id_sucursal?: number;
  nombre_sucursal: string;
  id_sillon?: number;
  nombre_sillon?: string;
  fecha: any;
  hora_inicio: string;
  hora_fin?: string;
  duracion?: number;
  comentarios?: string;
  fecha_actualizacion?: any;
  whatsApp?: string; //OJO, DEBE SER NUMBER
  links?: Link[];
}

export interface B2ChatToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface BroadcastData {
  from: string;
  to: string;
  contact_name: string;
  template_name: string;
  campaign_name: string;
  values: string[];
}

export interface BroadcastResponse {
  message: string;
  trace_id: string;
}

export interface AppointmentsIds {
  id: number;
  appointmentState: string;
}

export interface Patient {
  data: PatientData;
}

export interface PatientData {
  id: number;
  rut: string;
  tipo_documento: number;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  fecha_afiliacion: string;
  telefono: string;
  celular: string;
  ciudad: string;
  comuna: string;
  direccion: string;
  email: string;
  sexo: string;
  numero_ficha: string;
  observaciones: string;
  tiene_cargas: number;
  es_carga: number;
  fecha_deshabilitacion: string;
  id_usuario_deshabilitacion: string;
  habilitado: number;
  links: Link[];
}

export interface ComponentVisibility {
  secretKeys: boolean;
  lineSelection: boolean;
  clinicsList: boolean;
  templateSelection: boolean;
  summary: boolean;
}
