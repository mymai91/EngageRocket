import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {firebaseConfig} from '../environments/firebase.config'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { DriversComponent } from './drivers/drivers.component';

@NgModule({
  declarations: [
    AppComponent,
    DriversComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
