import { Component} from '@angular/core';
import { DentalinkQuerysService } from '../../services/dentalink-querys.service';

@Component({
  selector: 'app-secret-keys',
  templateUrl: './secret-keys.component.html',
  styleUrls: ['./secret-keys.component.scss']
})
export class SecretKeysComponent{

  constructor(private dentalinkQuerysService: DentalinkQuerysService) { }

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get saveKeys() {
    return this.dentalinkQuerysService.saveKeys;
  }
  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }


}
