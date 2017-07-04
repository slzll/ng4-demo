import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';

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
  constructor(private service: CommonServiceService) {
    this.vmcourse = 1;
  }

  ngOnInit() {
    this.service.getData('CourseList',
        { page: 1, rows: 8, flag: true, desc: 'desc', sort: 'Sort', wordLimt: 30 }).then(res => {

      this.requiredCourseData = res.ListData;
      this.imgSource = res.ImageCourse;
      // console.log(this.requiredCourseData);
    });
    this.service.getData('CourseList',
        { page: 1, rows: 8, flag: false, desc: 'desc', sort: 'Sort', wordLimt: 30 }).then(res => {
      this.electivesCourseData = res.ListData;
      // console.log(this.electivesCourseData);
    });
  }

}
