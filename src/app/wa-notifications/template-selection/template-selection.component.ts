import { Component } from '@angular/core';
import { Appointment } from 'src/app/interfaces/interface';
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
  get whatsAppTemplates() {
    return this.dentalinkQuerysService.whatsAppTemplates;
  }
  get allAppointments() {
    return this.dentalinkQuerysService.allAppointments;
  }
  get validAppointmentIds() {
    return this.dentalinkQuerysService.validAppointmentIds;
  }
  get componentVisibility() {
    return this.dentalinkQuerysService.componentVisibility;
  }
  

  // allAppointments: AllAppointments = {
  //   appointments: [],
  // };

  selectTemplate() {
    console.log(this.mainParams.selectedTemplateName);
    this.getAppointments();
    this.componentVisibility.templateSelection = false;
      this.componentVisibility.summary = true;
  }

  validateAppointment(appointment: Appointment): boolean {
    let existsInSelectedClinics: boolean = true;
    //Sucursal seleccionada
    if (
      !this.mainParams.selectedClinics.includes(appointment.nombre_sucursal)
    ) {
      existsInSelectedClinics = false;
    }

    let isValidAppointmentId: boolean = false;
    //Cita vigente
    this.validAppointmentIds.forEach((validAppointmentId) => {
      if (validAppointmentId.id === appointment.id_estado) {
        isValidAppointmentId = true;
      }
    });
    return existsInSelectedClinics && isValidAppointmentId ? true : false;
  }

  getAppointments() {
    console.log(
      'this.mainParams.appointmentsDate',
      this.mainParams.appointmentsDate
    );
    let appointmentsUrl: string = `https://api.dentalink.healthatom.com/api/v1/citas?q={"fecha":{"eq":"${this.mainParams.appointmentsDate}"}}`;

    console.log('this.appointmentsUrl', appointmentsUrl);
    this.dentalinkQuerysService
      .getAppointments(appointmentsUrl)
      .subscribe((response) => {
        console.log(response);

        response.data.forEach((appointment) => {
          if (this.validateAppointment(appointment)) {
            this.allAppointments.appointments.push(appointment);
          }
        });
        console.log('this.allAppointments: ', this.allAppointments);
        console.log('Linea 0', response);
        this.dentalinkQuerysService
          .getAppointments(response.links.next)
          .subscribe((response) => {
            response.data.forEach((appointment) => {
              if (this.validateAppointment(appointment)) {
                this.allAppointments.appointments.push(appointment);
              }
            });
            console.log('this.allAppointments: ', this.allAppointments);
            console.log('Linea 1', response);
            this.dentalinkQuerysService
              .getAppointments(response.links.next)
              .subscribe((response) => {
                response.data.forEach((appointment) => {
                  if (this.validateAppointment(appointment)) {
                    this.allAppointments.appointments.push(appointment);
                  }
                });
                console.log('this.allAppointments: ', this.allAppointments);
                console.log('Linea 2', response);
                this.dentalinkQuerysService
                  .getAppointments(response.links.next)
                  .subscribe((response) => {
                    response.data.forEach((appointment) => {
                      if (this.validateAppointment(appointment)) {
                        this.allAppointments.appointments.push(appointment);
                      }
                    });
                    console.log('this.allAppointments: ', this.allAppointments);
                    console.log('Linea 3', response);
                    this.dentalinkQuerysService
                      .getAppointments(response.links.next)
                      .subscribe((response) => {
                        response.data.forEach((appointment) => {
                          if (this.validateAppointment(appointment)) {
                            this.allAppointments.appointments.push(appointment);
                          }
                        });
                        console.log(
                          'this.allAppointments: ',
                          this.allAppointments
                        );
                        console.log('Linea 4', response);
                        this.dentalinkQuerysService
                          .getAppointments(response.links.next)
                          .subscribe((response) => {
                            response.data.forEach((appointment) => {
                              if (this.validateAppointment(appointment)) {
                                this.allAppointments.appointments.push(
                                  appointment
                                );
                              }
                            });
                            console.log(
                              'this.allAppointments: ',
                              this.allAppointments
                            );
                            console.log('Linea 5', response);
                            this.dentalinkQuerysService
                              .getAppointments(response.links.next)
                              .subscribe((response) => {
                                response.data.forEach((appointment) => {
                                  if (this.validateAppointment(appointment)) {
                                    this.allAppointments.appointments.push(
                                      appointment
                                    );
                                  }
                                });
                                console.log(
                                  'this.allAppointments: ',
                                  this.allAppointments
                                );
                                console.log('Linea 6', response);
                                this.dentalinkQuerysService
                                  .getAppointments(response.links.next)
                                  .subscribe((response) => {
                                    response.data.forEach((appointment) => {
                                      if (
                                        this.validateAppointment(appointment)
                                      ) {
                                        this.allAppointments.appointments.push(
                                          appointment
                                        );
                                      }
                                    });
                                    console.log(
                                      'this.allAppointments: ',
                                      this.allAppointments
                                    );
                                    console.log('Linea 7', response);
                                    this.dentalinkQuerysService
                                      .getAppointments(response.links.next)
                                      .subscribe((response) => {
                                        response.data.forEach((appointment) => {
                                          if (
                                            this.validateAppointment(
                                              appointment
                                            )
                                          ) {
                                            this.allAppointments.appointments.push(
                                              appointment
                                            );
                                          }
                                        });
                                        console.log(
                                          'this.allAppointments: ',
                                          this.allAppointments
                                        );
                                        console.log('Linea 8', response);
                                        this.dentalinkQuerysService
                                          .getAppointments(response.links.next)
                                          .subscribe((response) => {
                                            response.data.forEach(
                                              (appointment) => {
                                                if (
                                                  this.validateAppointment(
                                                    appointment
                                                  )
                                                ) {
                                                  this.allAppointments.appointments.push(
                                                    appointment
                                                  );
                                                }
                                              }
                                            );
                                            console.log(
                                              'this.allAppointments: ',
                                              this.allAppointments
                                            );
                                            console.log('Linea 9', response);
                                            this.dentalinkQuerysService
                                              .getAppointments(
                                                response.links.next
                                              )
                                              .subscribe((response) => {
                                                response.data.forEach(
                                                  (appointment) => {
                                                    if (
                                                      this.validateAppointment(
                                                        appointment
                                                      )
                                                    ) {
                                                      this.allAppointments.appointments.push(
                                                        appointment
                                                      );
                                                    }
                                                  }
                                                );
                                                console.log(
                                                  'this.allAppointments: ',
                                                  this.allAppointments
                                                );
                                                console.log(
                                                  'Linea 10',
                                                  response
                                                );
                                                this.dentalinkQuerysService
                                                  .getAppointments(
                                                    response.links.next
                                                  )
                                                  .subscribe((response) => {
                                                    response.data.forEach(
                                                      (appointment) => {
                                                        if (
                                                          this.validateAppointment(
                                                            appointment
                                                          )
                                                        ) {
                                                          this.allAppointments.appointments.push(
                                                            appointment
                                                          );
                                                        }
                                                      }
                                                    );
                                                    console.log(
                                                      'this.allAppointments: ',
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
                                                        response.data.forEach(
                                                          (appointment) => {
                                                            if (
                                                              this.validateAppointment(
                                                                appointment
                                                              )
                                                            ) {
                                                              this.allAppointments.appointments.push(
                                                                appointment
                                                              );
                                                            }
                                                          }
                                                        );
                                                        console.log(
                                                          'this.allAppointments: ',
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
                                                          .subscribe(
                                                            (response) => {
                                                              response.data.forEach(
                                                                (
                                                                  appointment
                                                                ) => {
                                                                  if (
                                                                    this.validateAppointment(
                                                                      appointment
                                                                    )
                                                                  ) {
                                                                    this.allAppointments.appointments.push(
                                                                      appointment
                                                                    );
                                                                  }
                                                                }
                                                              );
                                                              console.log(
                                                                'this.allAppointments: ',
                                                                this
                                                                  .allAppointments
                                                              );
                                                              console.log(
                                                                'Linea 13',
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
                                                                    response.data.forEach(
                                                                      (
                                                                        appointment
                                                                      ) => {
                                                                        if (
                                                                          this.validateAppointment(
                                                                            appointment
                                                                          )
                                                                        ) {
                                                                          this.allAppointments.appointments.push(
                                                                            appointment
                                                                          );
                                                                        }
                                                                      }
                                                                    );
                                                                    console.log(
                                                                      'this.allAppointments: ',
                                                                      this
                                                                        .allAppointments
                                                                    );
                                                                    console.log(
                                                                      'Linea 14',
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
                                                                          response.data.forEach(
                                                                            (
                                                                              appointment
                                                                            ) => {
                                                                              if (
                                                                                this.validateAppointment(
                                                                                  appointment
                                                                                )
                                                                              ) {
                                                                                this.allAppointments.appointments.push(
                                                                                  appointment
                                                                                );
                                                                              }
                                                                            }
                                                                          );
                                                                          console.log(
                                                                            'this.allAppointments: ',
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
                                                                                response.data.forEach(
                                                                                  (
                                                                                    appointment
                                                                                  ) => {
                                                                                    if (
                                                                                      this.validateAppointment(
                                                                                        appointment
                                                                                      )
                                                                                    ) {
                                                                                      this.allAppointments.appointments.push(
                                                                                        appointment
                                                                                      );
                                                                                    }
                                                                                  }
                                                                                );
                                                                                console.log(
                                                                                  'this.allAppointments: ',
                                                                                  this
                                                                                    .allAppointments
                                                                                );
                                                                                console.log(
                                                                                  'Linea 16',
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
                                                                                      response.data.forEach(
                                                                                        (
                                                                                          appointment
                                                                                        ) => {
                                                                                          if (
                                                                                            this.validateAppointment(
                                                                                              appointment
                                                                                            )
                                                                                          ) {
                                                                                            this.allAppointments.appointments.push(
                                                                                              appointment
                                                                                            );
                                                                                          }
                                                                                        }
                                                                                      );
                                                                                      console.log(
                                                                                        'this.allAppointments: ',
                                                                                        this
                                                                                          .allAppointments
                                                                                      );
                                                                                      console.log(
                                                                                        'Linea 17',
                                                                                        response
                                                                                      );
                                                                                    }
                                                                                  );
                                                                              }
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

  // getAppointments() {
  //   this.dentalinkQuerysService
  //     .getAppointments(this.appointmentsUrl)
  //     .subscribe((response) => {
  //       response.data.forEach((appointment) => {
  //         if (this.validateAppointment(appointment)) {
  //           this.allAppointments.appointments.push(appointment);
  //         }
  //         // if (appointment.nombre_sucursal === 'Almacén') { //Esta validación es para hacer pruebas con almacen. Luego debo validar que solo estoy guardando las citas de las sede seleccionadas por el usuario
  //         //   this.allAppointments.appointments.push(appointment);
  //         // }
  //       });
  //       console.log('this.allAppointments: ', this.allAppointments);
  //       console.log('Linea 1', response);
  //       // this.dentalinkQuerysService
  //       //   .getAppointments(response.links.next)
  //       //   .subscribe((response) => {
  //       //     this.allAppointments.appointments.push(...response.data);
  //       //     console.log(this.allAppointments);
  //       //     console.log('Linea 2', response);
  //       //     this.dentalinkQuerysService
  //       //       .getAppointments(response.links.next)
  //       //       .subscribe((response) => {
  //       //         this.allAppointments.appointments.push(...response.data);
  //       //         console.log(this.allAppointments);
  //       //         console.log('Linea 3', response);
  //       //         this.dentalinkQuerysService
  //       //           .getAppointments(response.links.next)
  //       //           .subscribe((response) => {
  //       //             this.allAppointments.appointments.push(...response.data);
  //       //             console.log(this.allAppointments);
  //       //             console.log('Linea 4', response);
  //       //             this.dentalinkQuerysService
  //       //               .getAppointments(response.links.next)
  //       //               .subscribe((response) => {
  //       //                 this.allAppointments.appointments.push(
  //       //                   ...response.data
  //       //                 );
  //       //                 console.log(this.allAppointments);
  //       //                 console.log('Linea 5', response);
  //       //                 this.dentalinkQuerysService
  //       //                   .getAppointments(response.links.next)
  //       //                   .subscribe((response) => {
  //       //                     this.allAppointments.appointments.push(
  //       //                       ...response.data
  //       //                     );
  //       //                     console.log(this.allAppointments);
  //       //                     console.log('Linea 6', response);
  //       //                     this.dentalinkQuerysService
  //       //                       .getAppointments(response.links.next)
  //       //                       .subscribe((response) => {
  //       //                         this.allAppointments.appointments.push(
  //       //                           ...response.data
  //       //                         );
  //       //                         console.log(this.allAppointments);
  //       //                         console.log('Linea 7', response);
  //       //                         this.dentalinkQuerysService
  //       //                           .getAppointments(response.links.next)
  //       //                           .subscribe((response) => {
  //       //                             this.allAppointments.appointments.push(
  //       //                               ...response.data
  //       //                             );
  //       //                             console.log(this.allAppointments);
  //       //                             console.log('Linea 8', response);
  //       //                             this.dentalinkQuerysService
  //       //                               .getAppointments(response.links.next)
  //       //                               .subscribe((response) => {
  //       //                                 this.allAppointments.appointments.push(
  //       //                                   ...response.data
  //       //                                 );
  //       //                                 console.log(this.allAppointments);
  //       //                                 console.log('Linea 9', response);
  //       //                                 this.dentalinkQuerysService
  //       //                                   .getAppointments(response.links.next)
  //       //                                   .subscribe((response) => {
  //       //                                     this.allAppointments.appointments.push(
  //       //                                       ...response.data
  //       //                                     );
  //       //                                     console.log(this.allAppointments);
  //       //                                     console.log('Linea  10', response);
  //       //                                     this.dentalinkQuerysService
  //       //                                       .getAppointments(
  //       //                                         response.links.next
  //       //                                       )
  //       //                                       .subscribe((response) => {
  //       //                                         this.allAppointments.appointments.push(
  //       //                                           ...response.data
  //       //                                         );
  //       //                                         console.log(
  //       //                                           this.allAppointments
  //       //                                         );
  //       //                                         console.log(
  //       //                                           'Linea 11',
  //       //                                           response
  //       //                                         );
  //       //                                         this.dentalinkQuerysService
  //       //                                           .getAppointments(
  //       //                                             response.links.next
  //       //                                           )
  //       //                                           .subscribe((response) => {
  //       //                                             this.allAppointments.appointments.push(
  //       //                                               ...response.data
  //       //                                             );
  //       //                                             console.log(
  //       //                                               this.allAppointments
  //       //                                             );
  //       //                                             console.log(
  //       //                                               'Linea 12',
  //       //                                               response
  //       //                                             );
  //       //                                             this.dentalinkQuerysService
  //       //                                               .getAppointments(
  //       //                                                 response.links.next
  //       //                                               )
  //       //                                               .subscribe((response) => {
  //       //                                                 this.allAppointments.appointments.push(
  //       //                                                   ...response.data
  //       //                                                 );
  //       //                                                 console.log(
  //       //                                                   this.allAppointments
  //       //                                                 );
  //       //                                                 console.log(
  //       //                                                   'Linea 13',
  //       //                                                   response
  //       //                                                 );
  //       //                                                 this.dentalinkQuerysService
  //       //                                                   .getAppointments(
  //       //                                                     response.links.next
  //       //                                                   )
  //       //                                                   .subscribe(
  //       //                                                     (response) => {
  //       //                                                       this.allAppointments.appointments.push(
  //       //                                                         ...response.data
  //       //                                                       );
  //       //                                                       console.log(
  //       //                                                         this
  //       //                                                           .allAppointments
  //       //                                                       );
  //       //                                                       console.log(
  //       //                                                         'Linea 14',
  //       //                                                         response
  //       //                                                       );
  //       //                                                       this.dentalinkQuerysService
  //       //                                                         .getAppointments(
  //       //                                                           response.links
  //       //                                                             .next
  //       //                                                         )
  //       //                                                         .subscribe(
  //       //                                                           (
  //       //                                                             response
  //       //                                                           ) => {
  //       //                                                             this.allAppointments.appointments.push(
  //       //                                                               ...response.data
  //       //                                                             );
  //       //                                                             console.log(
  //       //                                                               this
  //       //                                                                 .allAppointments
  //       //                                                             );
  //       //                                                             console.log(
  //       //                                                               'Linea 15',
  //       //                                                               response
  //       //                                                             );
  //       //                                                             this.dentalinkQuerysService
  //       //                                                               .getAppointments(
  //       //                                                                 response
  //       //                                                                   .links
  //       //                                                                   .next
  //       //                                                               )
  //       //                                                               .subscribe(
  //       //                                                                 (
  //       //                                                                   response
  //       //                                                                 ) => {
  //       //                                                                   this.allAppointments.appointments.push(
  //       //                                                                     ...response.data
  //       //                                                                   );
  //       //                                                                   console.log(
  //       //                                                                     this
  //       //                                                                       .allAppointments
  //       //                                                                   );
  //       //                                                                   console.log(
  //       //                                                                     'Linea 16',
  //       //                                                                     response
  //       //                                                                   );
  //       //                                                                 }
  //       //                                                               );
  //       //                                                           }
  //       //                                                         );
  //       //                                                     }
  //       //                                                   );
  //       //                                               });
  //       //                                           });
  //       //                                       });
  //       //                                   });
  //       //                               });
  //       //                           });
  //       //                       });
  //       //                   });
  //       //               });
  //       //           });
  //       //       });
  //       //   });
  //     });
  // }
}
