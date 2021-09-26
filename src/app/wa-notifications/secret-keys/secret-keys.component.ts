import { Component } from '@angular/core';
import { WhatsAppQuerysService } from 'src/app/services/whats-app-querys.service';
import { DentalinkQuerysService } from '../../services/dentalink-querys.service';

@Component({
  selector: 'app-secret-keys',
  templateUrl: './secret-keys.component.html',
  styleUrls: ['./secret-keys.component.scss'],
})
export class SecretKeysComponent {
  constructor(
    private dentalinkQuerysService: DentalinkQuerysService,
    private whatsAppQuerysService: WhatsAppQuerysService
  ) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }

  //Con este método nos aseguramos que ingresaron una clave de dentalink de una longitud adecuada y al cambiar secretKeysCompleted a true se oculta el componente
  saveKeys() {
    if (this.secretKeys.dentalinkKey.trim().length === 81) {
      this.mainParams.secretKeysCompleted = true;
    } else {
      alert('Clave no ingresada');
    }
    console.log(this.secretKeys); //borrar por seguridad
  }

  //Obtenemos el token de whatsapp desde nuestro backend
  getWhatsAppToken() {
    this.whatsAppQuerysService.getWhatsAppToken().subscribe((response) => {
      this.secretKeys.b2ChatToken = response.access_token;
      console.log(this.secretKeys.b2ChatToken);
    });
  }
}
