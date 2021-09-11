import { Component } from '@angular/core';
import {
  AllAppointments,
  DentalinkClinics,
} from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';

@Component({
  selector: 'app-template-selection',
  templateUrl: './template-selection.component.html',
  styleUrls: ['./template-selection.component.scss'],
})
export class TemplateSelectionComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get appointmentsUrl() {
    return this.dentalinkQuerysService.appointmentsUrl;
  }
  get whatsAppTemplates() {
    return this.dentalinkQuerysService.whatsAppTemplates;
  }

  allAppointments: AllAppointments = {
    appointments: [],
  };

  selectTemplate() {
    console.log(this.mainParams.selectedTemplate);
    this.getAppointments();
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
