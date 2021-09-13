import { Injectable } from '@angular/core';
import { DentalinkQuerysService } from './dentalink-querys.service';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppQuerysService {

  constructor(private dentalinkQuerysService: DentalinkQuerysService) { }
}
