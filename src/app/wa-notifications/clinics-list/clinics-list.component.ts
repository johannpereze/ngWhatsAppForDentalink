import { Component } from '@angular/core';
import { DentalinkClinics } from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';

@Component({
  selector: 'app-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.scss'],
})
export class ClinicsListComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get componentVisibility() {
    return this.dentalinkQuerysService.componentVisibility;
  }

  clinicsApiResponse: DentalinkClinics = {
    links: '',
    data: [],
  };

  clinicsInputs = {
    save: {
      text: 'Guardar Fecha',
      disabled: true,
    },
    next: {
      text: 'Siguiente',
      disabled: true,
    },
    toggle: {
      text: 'Deseleccionar todo',
      disabled: true,
    },
    checkboxes: {
      text: '',
      checked: true,
    },
  };

  toggleClinics() {
    this.clinicsInputs.checkboxes.checked =
      !this.clinicsInputs.checkboxes.checked;
    this.clinicsInputs.toggle.text === 'Deseleccionar todo'
      ? (this.clinicsInputs.toggle.text = 'Seleccionar todo')
      : (this.clinicsInputs.toggle.text = 'Deseleccionar todo');
  }

  parseDateForMainParams(date: string) {
    let splittedDate = date.split('-');
    for (let i = 1; i <= 2; i++) {
      if (splittedDate[i].length === 1) {
        return;
      } else {
        splittedDate[i] = `0${splittedDate[i]}`;
      }
    }
    return splittedDate;
  }

  getClinics() {
    console.log(this.mainParams.appointmentsDate);
    const selectedDate = new Date(this.mainParams.appointmentsDate);
    // this.mainParams.appointmentsDate = this.mainParams.appointmentsDate.split(' ').splice().join()
    const selectedDateString = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;
    console.log(selectedDateString);

    const selectedDateArray = selectedDateString.split('-');
    console.log(selectedDateArray);

    

    this.clinicsInputs.save.text = 'Guardando...';
    this.dentalinkQuerysService.getClinics().subscribe((response) => {
      this.clinicsApiResponse = response;
      console.log(this.clinicsApiResponse);
      this.clinicsInputs.next.disabled = false;
      this.clinicsInputs.toggle.disabled = false;
      this.clinicsInputs.save.text = 'Guardar Fecha';
    });
  }

  saveClinics(event: any) {
    //no estoy seguro del tipado
    console.log(event);

    this.clinicsApiResponse.data.forEach((clinic, i) => {
      if (event.srcElement[i + 3].checked) {
        this.mainParams.selectedClinics.push(event.srcElement[i + 3].name);
      }
    });

    // for (let i = 0; i < this.clinicsApiResponse.data.length; i++) {
    //   if (event.srcElement[i].checked) {
    //     //srcElement está deprecado
    //     this.mainParams.selectedClinics.push(event.srcElement[i].name);
    //   }
    // }
    console.log(this.mainParams.appointmentsDate);
    console.log(this.mainParams.selectedClinics);
    console.log(this.mainParams);
    this.componentVisibility.clinicsList = false;
    this.componentVisibility.templateSelection = true;
  }
}
