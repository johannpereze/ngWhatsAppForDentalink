import { Component } from '@angular/core';

interface SecretKeys {
  dentalinkKey: string;
  b2chatUser: string;
  b2ChatPass: string;
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

  saveKeys(event:any) {
    console.log(this.secretKeys);
  }
}
