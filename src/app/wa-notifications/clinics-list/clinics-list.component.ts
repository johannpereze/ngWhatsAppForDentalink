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

  getClinics() {
    this.dentalinkQuerysService.getClinics().subscribe((response) => {
      this.clinicsApiResponse = response;
      console.log(this.clinicsApiResponse);
    });
  }

  saveClinics(event: any) {
    //no estoy seguro del tipado
    console.log(event);
    
    this.clinicsApiResponse.data.forEach((clinic, i)=>{
      if (event.srcElement[i+2].checked){
        this.mainParams.selectedClinics.push(event.srcElement[i+2].name)
      }
    })

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
