import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';
import "../../directive/err-src.directive"

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  requiredCourseData: Array<any>;
  electivesCourseData: Array<any>;
  vmcourse: number;
  imgSource: String;
  constructor(private service: CommonServiceService) {
    this.vmcourse = 1;
  }

  ngOnInit() {
    const option1 =  { page: 1, rows: 8, flag: true, desc: 'desc', sort: 'Sort', wordLimt: 30 };
    const option2 =  { page: 1, rows: 8, flag: false, desc: 'desc', sort: 'Sort', wordLimt: 30 };
    this.service.getData('CourseList', option1).then(res => {

      this.requiredCourseData = res.Data.ListData;
      this.imgSource = res.Data.ImageCourse;
      // console.log(this.requiredCourseData);
    });
    this.service.getData('CourseList',option2).then(res => {
      this.electivesCourseData = res.Data.ListData;
      // console.log(this.electivesCourseData);
    });
  }

}
