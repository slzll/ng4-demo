import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { GlobalConfig } from '../global-config';

@Component({
  selector: 'app-nav-bars',
  templateUrl: './nav-bars.component.html',
  styleUrls: ['./nav-bars.component.css']
})
export class NavBarsComponent implements OnInit {
  realTimeData = {
    Model: {
      OnlineUsersCount: 0,
      CourseCount: 0,
      UserVisitCount: 0
    }
  };
  constructor(private http: Http) { }

  getData(): Promise<any> {
    return this.http.get(GlobalConfig.ALL_PORT.LeftRealTimeData.url).toPromise().then(r => r.json().Data);
  }

  ngOnInit() {
    this.getData().then(res => {
      this.realTimeData = res;
      console.log(this.realTimeData);
    });
  }

}
