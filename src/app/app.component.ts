import { Component, ElementRef, ViewChild } from '@angular/core';
import { DentalinkQuerysService } from './services/dentalink-querys.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // @ViewChild('lineSelection') lineSelection!: ElementRef<HTMLInputElement>;

  constructor(private dentalinkQuerysService: DentalinkQuerysService) {
    // console.log(this.lineSelection);
  }

  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }
  get whatsAppLines() {
    return this.dentalinkQuerysService.whatsAppLines;
  }

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }

  get saveKeys() {
    return this.dentalinkQuerysService.saveKeys;
  }
  get whatsAppTemplates() {
    return this.dentalinkQuerysService.whatsAppTemplates;
  }
  get getClinics() {
    return this.dentalinkQuerysService.getClinics;
  }
  // get headers() {
  //   return this.dentalinkQuerysService.httpHeader;
  // }

  selectLine() {
    console.log(this.mainParams.selectedLine);
    console.log(this.mainParams.campaignNote);
  }
  selectTemplate(){
    this.getClinics()
  }
}
