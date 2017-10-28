import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

export class Score {
  constructor(
    public value: number,
    public driver: string,
    public answer_count: number
  ) {}
}

export class Location {
  constructor(
    public attribute_detail_value: string,
    public scores: Object[]
  ) {}
}

export class Driver {
  constructor(
    public attribute: string,
    public attribute_values: Object[]
  ) {}
}

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  public driverCollections: Driver[];
  public locations: Location[];
  public drivers: string[];
  public score: Score[];
  public drivers_arr: Observable<any[]>;
  public fbDriverLocations: Observable<any[]>[] = [];
  constructor(public http: Http, public db: AngularFireDatabase) {
    
    // NoSQL - firebase realtime database way
    db.list('drivers').snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let driverName = action.payload.val().driverName;
        this.drivers_arr= db.list('/driverLocation', ref => ref.orderByChild('driverName').equalTo(driverName)).snapshotChanges();
        this.fbDriverLocations.push(this.drivers_arr);
      });
    });
  }

  ngOnInit() {
  }

  // return drivers array
  getDrivers(drivers) {
    let data = [];
    drivers.forEach((item) => {
      data.push(item.driver);
    });
    return data;
  }

  // return infoDrivers array
  getDriverCollections() {
    return this.http
      .get('../assets/drivers.json')
      .map(response => response.json());
  }

}
