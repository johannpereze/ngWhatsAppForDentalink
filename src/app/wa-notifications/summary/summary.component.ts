import { Component } from '@angular/core';
import { AllAppointments, Appointment, MainParams } from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
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

  templatesWithData: string[]=[
    'placeholder'
  ]

  // templatesWithDataExamples: string[] = []

  putDataIntoTemplate(appointment:Appointment){
    let arrayOfTemplate:any = this.mainParams.selectedTemplateTemplate
    // console.log(arrayOfTemplate);
    
    arrayOfTemplate = arrayOfTemplate.split("'")
    const var1 = appointment.nombre_paciente
    const var2 = appointment.nombre_sucursal
    const var3 = appointment.fecha
    const var4 = appointment.hora_inicio
    const var5 = appointment.nombre_dentista
    // console.log("arrayOfTemplate", arrayOfTemplate);
    //array.splice(start, deleteCount, item)
    arrayOfTemplate.splice(1, 1, var1)
    arrayOfTemplate.splice(3, 1, var2)
    arrayOfTemplate.splice(5, 1, var3)
    arrayOfTemplate.splice(7, 1, var4)
    arrayOfTemplate.splice(9, 1, var5)
    console.log('Aqui debería ir con el nombre',arrayOfTemplate);

    return 'nada aun'
  }

  showTemplateWithData() {
    //busque la propiedad template en el objeto con name coincidente con selectedTemplateName

    this.whatsAppTemplates.forEach((value)=>{
      if (value.name === this.mainParams.selectedTemplateName){
        this.mainParams.selectedTemplateTemplate = value.template
      }
    })

    console.log(this.allAppointments);
    
    this.allAppointments.appointments.forEach(element => {
      const templateWithData:string = this.putDataIntoTemplate(element)
      this.templatesWithData.push(templateWithData)

    });
    
    console.log(this.templatesWithData);
    
    //Cuando ya tengamos el template le vamos a meter en las variables datos reales 10 veces para mostrar 10 ejemplos



  //   for (let i = 0; i < 10; i++) {
  //     console.log(
  //       'this.mainParams.selectedTemplateName',
  //       this.mainParams.selectedTemplateName
  //     );
  //     for (const name in this.whatsAppTemplates) {
  //       if (
  //         Object.prototype.hasOwnProperty.call(this.whatsAppTemplates, name)
  //       ) {
  //         console.log(
  //           'this.whatsAppTemplates[name].template',
  //           this.whatsAppTemplates[name].template
  //         );
  //         console.log('this.allAppointments', this.allAppointments);
  //         console.log(
  //           'Aquí se imprime el ejemplo si no hay datos o el primer paciente real',
  //           this.allAppointments.appointments[1] ||
  //             this.allAppointments.appointments[0]
  //         );
  //       }
  //     }
  //   }
  }
}
