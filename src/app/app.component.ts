import { Component } from '@angular/core';
import {
  AllAppointments,
  DentalinkAppointments,
  DentalinkClinics,
} from './interfaces/interface';
import { DentalinkQuerysService } from './services/dentalink-querys.service';
import { Appointments } from './interfaces/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  //Todos los getters del servicio para traer la data
  // get secretKeys() {
  //   return this.dentalinkQuerysService.secretKeys;
  // }
  get whatsAppLines() {
    return this.dentalinkQuerysService.whatsAppLines;
  }
  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  // get saveKeys() {
  //   return this.dentalinkQuerysService.saveKeys;
  // }
  get whatsAppTemplates() {
    return this.dentalinkQuerysService.whatsAppTemplates;
  }
  get appointmentsUrl() {
    return this.dentalinkQuerysService.appointmentsUrl;
  }

  
  selectTemplate() {
    console.log(this.mainParams.selectedTemplate);
    this.getClinics();
    this.getAppointments();
  }

  saveClinics(event: any) {
    //No se como tipar este SumbitEvent

    for (let i = 0; i < this.clinicsApiResponse.data.length; i++) {
      // console.log(event.srcElement[i].name);
      // console.log(event.srcElement[i].checked);

      if (event.srcElement[i].checked) {
        this.mainParams.selectedClinics.push(event.srcElement[i].name);
      }
    }

    console.log(this.mainParams.appointmentsDate);

    console.log(this.mainParams.selectedClinics);

    console.log(this.mainParams);
  }

  clinicsApiResponse: DentalinkClinics = {
    links: '',
    data: [],
  };
  appointmentsApiResponse: DentalinkAppointments = {
    links: {
      current: '',
      next: '',
    },
    data: [],
  };

  allAppointments: AllAppointments = {
    appointments: [],
  };

  //Todo esto debería estar correctamente tipado

  getClinics() {
    this.dentalinkQuerysService.getClinics().subscribe((response) => {
      this.clinicsApiResponse = response;
      console.log(this.clinicsApiResponse);
    });
  }

  getAppointments() {
    this.dentalinkQuerysService
      .getAppointments(this.appointmentsUrl)
      .subscribe((response) => {
        this.allAppointments.appointments.push(...response.data);
        console.log(this.allAppointments);
        console.log('Linea 1', response);
        this.dentalinkQuerysService
          .getAppointments(response.links.next)
          .subscribe((response) => {
            this.allAppointments.appointments.push(...response.data);
            console.log(this.allAppointments);
            console.log('Linea 2', response);
            this.dentalinkQuerysService
              .getAppointments(response.links.next)
              .subscribe((response) => {
                this.allAppointments.appointments.push(...response.data);
                console.log(this.allAppointments);
                console.log('Linea 3', response);
                this.dentalinkQuerysService
                  .getAppointments(response.links.next)
                  .subscribe((response) => {
                    this.allAppointments.appointments.push(...response.data);
                    console.log(this.allAppointments);
                    console.log('Linea 4', response);
                    this.dentalinkQuerysService
                      .getAppointments(response.links.next)
                      .subscribe((response) => {
                        this.allAppointments.appointments.push(
                          ...response.data
                        );
                        console.log(this.allAppointments);
                        console.log('Linea 5', response);
                        this.dentalinkQuerysService
                          .getAppointments(response.links.next)
                          .subscribe((response) => {
                            this.allAppointments.appointments.push(
                              ...response.data
                            );
                            console.log(this.allAppointments);
                            console.log('Linea 6', response);
                            this.dentalinkQuerysService
                              .getAppointments(response.links.next)
                              .subscribe((response) => {
                                this.allAppointments.appointments.push(
                                  ...response.data
                                );
                                console.log(this.allAppointments);
                                console.log('Linea 7', response);
                                this.dentalinkQuerysService
                                  .getAppointments(response.links.next)
                                  .subscribe((response) => {
                                    this.allAppointments.appointments.push(
                                      ...response.data
                                    );
                                    console.log(this.allAppointments);
                                    console.log('Linea 8', response);
                                    this.dentalinkQuerysService
                                      .getAppointments(response.links.next)
                                      .subscribe((response) => {
                                        this.allAppointments.appointments.push(
                                          ...response.data
                                        );
                                        console.log(this.allAppointments);
                                        console.log('Linea 9', response);
                                        this.dentalinkQuerysService
                                          .getAppointments(response.links.next)
                                          .subscribe((response) => {
                                            this.allAppointments.appointments.push(
                                              ...response.data
                                            );
                                            console.log(this.allAppointments);
                                            console.log('Linea  10', response);
                                            this.dentalinkQuerysService
                                              .getAppointments(
                                                response.links.next
                                              )
                                              .subscribe((response) => {
                                                this.allAppointments.appointments.push(
                                                  ...response.data
                                                );
                                                console.log(
                                                  this.allAppointments
                                                );
                                                console.log(
                                                  'Linea 11',
                                                  response
                                                );
                                                this.dentalinkQuerysService
                                                  .getAppointments(
                                                    response.links.next
                                                  )
                                                  .subscribe((response) => {
                                                    this.allAppointments.appointments.push(
                                                      ...response.data
                                                    );
                                                    console.log(
                                                      this.allAppointments
                                                    );
                                                    console.log(
                                                      'Linea 12',
                                                      response
                                                    );
                                                    this.dentalinkQuerysService
                                                      .getAppointments(
                                                        response.links.next
                                                      )
                                                      .subscribe((response) => {
                                                        this.allAppointments.appointments.push(
                                                          ...response.data
                                                        );
                                                        console.log(
                                                          this.allAppointments
                                                        );
                                                        console.log(
                                                          'Linea 13',
                                                          response
                                                        );
                                                        this.dentalinkQuerysService
                                                          .getAppointments(
                                                            response.links.next
                                                          )
                                                          .subscribe(
                                                            (response) => {
                                                              this.allAppointments.appointments.push(
                                                                ...response.data
                                                              );
                                                              console.log(
                                                                this
                                                                  .allAppointments
                                                              );
                                                              console.log(
                                                                'Linea 14',
                                                                response
                                                              );
                                                              this.dentalinkQuerysService
                                                                .getAppointments(
                                                                  response.links
                                                                    .next
                                                                )
                                                                .subscribe(
                                                                  (
                                                                    response
                                                                  ) => {
                                                                    this.allAppointments.appointments.push(
                                                                      ...response.data
                                                                    );
                                                                    console.log(
                                                                      this
                                                                        .allAppointments
                                                                    );
                                                                    console.log(
                                                                      'Linea 15',
                                                                      response
                                                                    );
                                                                    this.dentalinkQuerysService
                                                                      .getAppointments(
                                                                        response
                                                                          .links
                                                                          .next
                                                                      )
                                                                      .subscribe(
                                                                        (
                                                                          response
                                                                        ) => {
                                                                          this.allAppointments.appointments.push(
                                                                            ...response.data
                                                                          );
                                                                          console.log(
                                                                            this
                                                                              .allAppointments
                                                                          );
                                                                          console.log(
                                                                            'Linea 16',
                                                                            response
                                                                          );
                                                                        }
                                                                      );
                                                                  }
                                                                );
                                                            }
                                                          );
                                                      });
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  }
}
