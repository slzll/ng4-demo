import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from '../../global-config';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import {parseHttpResponse} from "selenium-webdriver/http";

@Component({
  selector: 'app-statistical-ranking',
  templateUrl: './statistical-ranking.component.html',
  styleUrls: ['./statistical-ranking.component.css']
})
export class StatisticalRankingComponent implements OnInit {
  courseRankData: any;
  unitRankData: any;
  userRankData: any;

  constructor(private http: Http) { }
  getData(url, option): Promise<any> {
    let params = new URLSearchParams();
    const data = Object.assign(GlobalConfig.ALL_PORT[url].data,
        option);
    for (let i in data) {
      params.set(i, data[i]);
    }
    return this.http.post(GlobalConfig.ALL_PORT[url].url, params
    ).toPromise().then(function (r) {
      return r.json().Data;
    });
  }

  ngOnInit() {
    // 课程排行
    this.getData('CourseClickRank', {rows: 10})
        .then(response => {
          this.courseRankData = response.ListData;
        });
    // 单位排行
    this.getData('LeftGroupRank', {rows: 10})
        .then(response => {
          this.unitRankData = response.ListData;
         });
    // 个人排行
    this.getData('LeftUserRank', {rows: 10})
        .then(response => {
          this.userRankData = response.ListData;
        });
  }

}
