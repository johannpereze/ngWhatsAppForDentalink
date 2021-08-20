import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'WhatsApp para Dentalink';
  names = ['juan', 'luis', 'jose'];
  addItem() {
    this.names.push('New Item');
  }
  removeItem(index: number) {
    this.names.splice(index, 1);
  }
}
