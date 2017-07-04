import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from '../../global-config';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  requiredCourseData: Array<Object>;
  electivesCourseData: Array<Object>;
  vmcourse: number;
  imgSource: String;
  constructor(private http: Http) {
    this.vmcourse = 1;
  }
  getData(option): Promise<any> {
    let params = new URLSearchParams();
    const data = Object.assign(GlobalConfig.ALL_PORT.CourseList.data,
      { page: 1, rows: 8, flag: option, desc: 'desc', sort: 'Sort', wordLimt: 30 });
    for (let i in data) {
      params.set(i, data[i]);
    }
    return this.http.post(GlobalConfig.ALL_PORT.CourseList.url, params
    ).toPromise().then(function (r) {
      return r.json().Data;
    });
  }


  ngOnInit() {
    this.getData('true').then(res => {

      this.requiredCourseData = res.ListData;
      this.imgSource = res.ImageCourse;
      // console.log(this.requiredCourseData);
    });
    this.getData('false').then(res => {
      this.electivesCourseData = res.ListData;
      // console.log(this.electivesCourseData);
    });
  }

}
