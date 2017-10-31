import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DriverService {

  constructor(public http: Http) { }

  // return infoDrivers array
  getDriverCollections() {
    return this.http
      .get('../assets/drivers.json')
      .map(response => response.json());
  }
}
