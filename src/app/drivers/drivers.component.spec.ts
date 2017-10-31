import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DriversComponent } from './drivers.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { DriverService } from '../service/driver/driver.service';

const driversJson = [
  [{
  		"attribute": "Location",
  		"attribute_values": [{
  				"attribute_detail_value": "Singapore",
  				"scores": [{
  						"value": 4,
  						"driver": "Driver1",
  						"answer_count": 9
  					},
  					{
  						"value": 3.3,
  						"driver": "Driver2",
  						"answer_count": 15
  					},
  					{
  						"value": 3.3,
  						"driver": "Driver3",
  						"answer_count": 17
  					}
  				]
  			}
  		]
  	},
  	{
  		"attribute": "Gender",
  		"attribute_values": [{
  				"attribute_detail_value": "Male",
  				"scores": [{
  						"value": 4,
  						"driver": "Driver1",
  						"answer_count": 9
  					},
  					{
  						"value": 3.3,
  						"driver": "Driver2",
  						"answer_count": 15
  					},
  					{
  						"value": 3.3,
  						"driver": "Driver3",
  						"answer_count": 17
  					}
  				]
  			}
  		]
  	}
  ]
];

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;
  let db = { "db": {
                    list: () => Observable.of(driversJson.map(t => {return {"$value": t}})) }
                  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversComponent ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: AngularFireDatabase, useValue: 'db',
        },
        {
          provide: DriverService, useClass: DriverService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('getDriverCollections component methods', () => {
  //   it('should get driverCollections', inject([MockBackend], (mockBackend: MockBackend) => {
  //     const fixture = TestBed.createComponent(DriversComponent);
  //     const driversComponent: DriversComponent = fixture.componentInstance;
  //     let conn: MockConnection;
  //     const response = new Response(new ResponseOptions({body: driversJson}));
  //     mockBackend.connections.subscribe((connection: MockConnection) => {
  //       conn = connection;
  //     });
  //     driversComponent.getDriverCollections().subscribe(jsonObject => {
  //       driversComponent.drivers = jsonObject;
  //     });
  //     conn.mockRespond(response);
  //     expect(driversComponent.drivers.length).toBe(1);
  //     mockBackend.verifyNoPendingRequests();
  //   }));
  // });

});
