import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';

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
})
export class DriversComponent implements OnInit {
  public driverCollections: Driver[];
  public locations: Location[];
  public drivers: string[];
  public score: Score[];
  public drivers_arr: Observable<any[]>;
  public fbDriverLocations: Observable<any[]>[] = [];
  public error: boolean = false;
  public fbError: boolean = false;

  constructor(public http: Http, public db: AngularFireDatabase) {
    this.getDriverCollections().subscribe(result => {
      this.driverCollections = result;
      result.forEach((item, index) => {
        if (item.attribute.toLowerCase() === "location") {
            this.locations = <Location[]> result[index].attribute_values;
            this.drivers = this.getDrivers(this.locations[0].scores);
            return false;
        }
      });
    }, error => {
      this.error = true;
    });
  }

  ngOnInit() {
    // NoSQL - firebase realtime database way
    this.getFbDriverLocations();
  }

  // return fbDriverLocations
  getFbDriverLocations() {
    this.db.list('/drivers').snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let driverName = action.payload.val().driverName;
        let drivers_arr= this.db.list('/driverLocation', ref => ref.orderByChild('driverName').equalTo(driverName)).snapshotChanges();
        this.fbDriverLocations.push(drivers_arr);
      });
    },error => {
      this.fbError = true;
    });
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
