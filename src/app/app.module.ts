import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WANotificationsModule } from './wa-notifications/wa-notifications.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    WANotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
