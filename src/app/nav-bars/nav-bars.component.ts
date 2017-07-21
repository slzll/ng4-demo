import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common-service.service';

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
  constructor(private service: CommonService) { }

  ngOnInit() {
    this.service.getData('LeftRealTimeData').then(res => {
      this.realTimeData = res.Data;
      console.log(this.realTimeData);
    });
  }

}
