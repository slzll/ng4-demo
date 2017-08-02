import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {CommonService} from "../../services/common-service.service";
import {GlobalConfig} from "../../global-config";


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  Id:number;
  courseDetailsData:any;
  token:any;
  showFav:boolean = true;
  constructor(private route:ActivatedRoute,private service:CommonService) {
    //保持在线
    service.keepOnline();
    this.token = service.AntiForgeryToken()
  }

  queryDetail () {
    this.route.params.subscribe(params =>{
      this.Id = params['Id'];
    });
    this.service.getData('CourseContent',Object.assign({}, GlobalConfig.ALL_PORT.CourseContent.data, { Id: this.Id }))
      .then((response)=> {
        this.courseDetailsData = response.Data;
      });
  };

  favoriteAdd (options, token) {
    let params = Object.assign({}, GlobalConfig.ALL_PORT.FavoriteAdd.data, options, token)
    this.service.getData('FavoriteAdd', params)
      .then(response =>{
        if (response.Type == 1) {
          this.courseDetailsData.CourseModel.FavoriteId = response.Value;
          alert(response.Message);
        }
      });
  };
  favoriteDelete(options, token) {
    let params = $.extend({}, GlobalConfig.ALL_PORT.FavoriteDelete.data, options, token)
    this.service.getData('FavoriteDelete',params)
      .then((response) =>{
        // console.log(params);
        if (response.Type == 1) {
          this.courseDetailsData.CourseModel.FavoriteId = 0;
          alert(response.Message);
        }
      });
  };

  selectClass (checkValue) {
    let params = $.extend({}, GlobalConfig.ALL_PORT.AddStudyCourse.data, { checkValue: checkValue }, this.token)
    this.service.getData('AddStudyCourse',params)
      .then((response)=> {
        if (response.Type == 1) {
          window.open('#/play/play/' + checkValue);
        }
      });
  };

  //参加测试
  havTest (Id) {
    let params = $.extend({}, GlobalConfig.ALL_PORT.Exam.data, this.token, { parameter1: Id })
    this.service.getData('Exam',params)
      .then((response)=> {
        if (response.Type) {
          //Type存在，意味着不能考试
          alert(response.Message);
        } else {
          window.open("#/exam/exam/" + Id);
        }

      });
  };

  ngOnInit() {
  }

}
