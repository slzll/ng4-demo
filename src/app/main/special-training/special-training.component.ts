import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from '../../global-config';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-special-training',
  templateUrl: './special-training.component.html',
  styleUrls: ['./special-training.component.css']
})
export class SpecialTrainingComponent implements OnInit {
  specialTraining: Array<Object>;
  vm: number;

  constructor(private http: Http) {
    this.vm = 1;
  }
  getData(): Promise<any> {
    let params = new URLSearchParams();
    const data = Object.assign(GlobalConfig.ALL_PORT.ArticleList.data,
        { page: 1, rows: 12, CategoryId: 27, desc: 'desc', sort: 'Sort', wordLimt: 20 });
    for (let i in data) {
      params.set(i, data[i]);
    }
    return this.http.post(GlobalConfig.ALL_PORT.ArticleList.url, params
    ).toPromise().then(function (r) {
      return r.json().Data;
    });
  }

  ngOnInit() {
    this.getData().then(res => {

      this.specialTraining = res.ListData;
      // console.log(this.requiredCourseData);
    });
  }

}
