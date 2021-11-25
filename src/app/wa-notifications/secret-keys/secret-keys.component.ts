import { Component } from '@angular/core';
import { WhatsAppQuerysService } from 'src/app/services/whats-app-querys.service';
import { DentalinkQuerysService } from '../../services/dentalink-querys.service';

@Component({
  selector: 'app-secret-keys',
  templateUrl: './secret-keys.component.html',
  styleUrls: ['./secret-keys.component.scss'],
})
export class SecretKeysComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }
  get componentVisibility() {
    return this.dentalinkQuerysService.componentVisibility;
  }

  //Con este método nos aseguramos que ingresaron una clave de dentalink de una longitud adecuada y al cambiar secretKeysCompleted a true se oculta el componente
  //Me gustaría refactorizar y no usar ngModels sino eventos pero aun no estoy seguro como
  saveKeys() {
    if (this.secretKeys.dentalinkKey.trim().length === 81) {
      //Aquí me falta validar que la contraseña sea coreecta. Una forma sería haciendo una peticion http a un endpoint muy ligero de dentalink y si retorna con exito, validar, si no, decir que contraseña incorrecta
      this.componentVisibility.secretKeys = false;
      this.componentVisibility.lineSelection = true;
    } else {
      alert('Contraseña no ingresada correctamente'); //Este no debería ser un alert sino un popup de material design o algo así
    }
    // console.log(this.secretKeys); //borrar por seguridad
  }
}
