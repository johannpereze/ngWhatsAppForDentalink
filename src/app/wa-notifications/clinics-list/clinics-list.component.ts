import { Component } from '@angular/core';
import { Clinics, DentalinkClinics } from 'src/app/interfaces/interface';
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

  clinicsLisVisibility: boolean = false;

  toggleClinics() {
    this.clinicsInputs.checkboxes.checked =
      !this.clinicsInputs.checkboxes.checked;
    this.clinicsInputs.toggle.text === 'Deseleccionar todo'
      ? (this.clinicsInputs.toggle.text = 'Seleccionar todo')
      : (this.clinicsInputs.toggle.text = 'Deseleccionar todo');
  }

  getClinics() {
    this.clinicsInputs.save.text = 'Guardando...';
    this.dentalinkQuerysService.getClinics().subscribe((response) => {
      this.clinicsApiResponse = response;
      console.log(this.clinicsApiResponse);
      this.clinicsInputs.next.disabled = false;
      this.clinicsInputs.toggle.disabled = false;
      this.clinicsLisVisibility = true;
      this.clinicsInputs.save.text = 'Guardar Fecha';
    });
  }

  saveClinics() {
    console.log(this.selectedClinics);

    this.selectedClinics.forEach((clinic) => {
      this.mainParams.selectedClinics.push(clinic.nombre);
    });

    console.log(this.mainParams.appointmentsDate);
    console.log(this.mainParams.selectedClinics);
    console.log(this.mainParams);
    this.clinicsLisVisibility = false;
    this.componentVisibility.clinicsList = false;
    this.componentVisibility.templateSelection = true;
  }

  selectedClinics: Clinics[] = [];

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'Nombre' },
  ];
}
