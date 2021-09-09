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


