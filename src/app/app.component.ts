import { Component } from '@angular/core';

interface SecretKeys {
  dentalinkKey: string;
  b2chatUser: string;
  b2ChatPass: string;
}

interface WhatsAppLine {
  name: string;
  countryCode: number;
  lineNumber: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  secretKeys: SecretKeys = {
    dentalinkKey: '',
    b2chatUser: '',
    b2ChatPass: '',
  };

  whatsAppLines: WhatsAppLine[] = [
    {
      name: 'Notificaciones Prevenga',
      countryCode: 57,
      lineNumber: 3137544892,
    },
    {
      name: 'Chats Prevenga',
      countryCode: 57,
      lineNumber: 3137596945,
    },
  ];

  secretKeysCompleted = false

  saveKeys() {
    if(this.secretKeys.dentalinkKey.trim().length === 81 &&
    this.secretKeys.b2chatUser.trim().length ===36 &&
    this.secretKeys.b2ChatPass.trim().length === 36){
      this.secretKeysCompleted = true

    }else{
      alert('Claves incompletas')
    } //Hacer estas validaciones y al final cuando pasen fenerar un false para poner en el ngif del form
    console.log(this.secretKeys);

  }
}
