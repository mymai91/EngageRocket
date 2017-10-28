import { Component } from '@angular/core';
import {initializeApp, database} from 'firebase';
import {firebaseConfig} from '../environments/firebase.config';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public db: AngularFireDatabase) {
    db.list('drivers').snapshotChanges().subscribe(actions => {
      console.log(actions);
    });
  };
}
