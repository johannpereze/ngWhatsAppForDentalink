import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Appointment,
  DentalinkAppointments,
  DentalinkClinics,
  Patient,

} from '../interfaces/interface';
import { Observable, of, timer } from 'rxjs';
import {
  tap,
  switchMap,
  delayWhen,
} from 'rxjs/operators';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root',
})
export class DentalinkQuerysService {
  constructor(
    private http: HttpClient,
    private globalVariablesService: GlobalVariablesService
  ) { }

  validateAppointment(appointment: Appointment): boolean {
    let existsInSelectedClinics: boolean = true;
    //Sucursal seleccionada
    if (
      !this.globalVariablesService.mainParams.selectedClinics.includes(appointment.nombre_sucursal)
    ) {
      existsInSelectedClinics = false;
    }

    let isValidAppointmentId: boolean = false;
    //Cita vigente
    this.globalVariablesService.validAppointmentIds.forEach((validAppointmentId) => {
      if (validAppointmentId.id === appointment.id_estado) {
        isValidAppointmentId = true;
      }
    });
    return existsInSelectedClinics && isValidAppointmentId ? true : false;
  }

  getClinics() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${this.globalVariablesService.secretKeys.dentalinkKey}`
    );
    return this.http.get<DentalinkClinics>(
      'https://api.dentalink.healthatom.com/api/v1/sucursales/',
      { headers }
    );
  }

  updateDentalinkAppointments(id: number) {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.globalVariablesService.secretKeys.dentalinkKey}`)
      .set('Content-Type', 'application/json');
    console.log(headers);
    const body = JSON.stringify({
      id_estado: 24,
    });
    return this.http.put<DentalinkAppointments>(
      `https://api.dentalink.healthatom.com/api/v1/citas/${id}`,
      body,
      { headers }
    );
  }

  delayForDentalink = () => timer(2000);

  getAppointments(url: string): any {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${this.globalVariablesService.secretKeys.dentalinkKey}`
    );
    return this.http.get<DentalinkAppointments>(url, { headers }).pipe(
      delayWhen(this.delayForDentalink),
      tap(console.log),
      switchMap((resp: DentalinkAppointments) => {
        if (resp.links.next) {
          this.globalVariablesService.allAppointments.appointmentsWitoutValidation.push(...resp.data);
          resp.data.forEach((appointment) => {
            if (this.validateAppointment(appointment)) {
              this.globalVariablesService.allAppointments.appointments.push(appointment);
            }
          });
          return this.getAppointments(resp.links.next);
        } else {
          this.globalVariablesService.allAppointments.appointmentsWitoutValidation.push(...resp.data);
          resp.data.forEach((appointment) => {
            if (this.validateAppointment(appointment)) {
              this.globalVariablesService.allAppointments.appointments.push(appointment);
            }
          });
          return this.globalVariablesService.allAppointments.appointments;
        }
      })
    );
  }

  getWANumbers(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${this.globalVariablesService.secretKeys.dentalinkKey}`
    );
    return this.http.get<Patient>(
      `https://api.dentalink.healthatom.com/api/v1/pacientes/${id}`,
      { headers }
      // ).pipe(retryWhen((errors) => errors.pipe(delay(40000), take(10))));//Esta línea es la única diferencia con la versión 1// Lo debería hacer con puppeteer
    );
  }
}
