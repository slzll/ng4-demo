import { Component, OnInit } from '@angular/core';
import {CommonService} from "../services/common-service.service";
import {Search} from "../Interface/search";
@Component({
  selector: 'app-course-center',
  templateUrl: './course-center.component.html',
  styleUrls: ['./course-center.component.css']
})

export class CourseCenterComponent implements OnInit{

  courseClassify:any;
  courseSupermarketData:Array<any>;
  imgSrc:any;
  search:Search= {
    title:'',
    flag:'',
    onlineTime:''
  };

  constructor(private service:CommonService) { }
  searchCourse(index,item){
    let courseListParams={
      page:1,
      rows:10,
      sort:'Sort',
      order:'desc',
      courseType:'All',
      channelId:'',
      title:'',
      titleNav:'学习资源中心',
      wordLimt:35,
      teacher:''
    };
    this.service.getData('CourseList',Object.assign(courseListParams,{channelId:item.Id,rows:5}))
      .then(res => {
        // console.log(res.Data.ListData)
        this.courseSupermarketData.splice(index, 0,res.Data);
        this.imgSrc= res.Data.ImageCourse;
        console.log(this.courseSupermarketData)
      })

  }

  ngOnInit() {
    this.service.getData('CourseCategory').then(res =>{
      this.courseClassify = res.Data.ListData;
      this.courseSupermarketData = Array(this.courseSupermarketData);
      this.courseSupermarketData = [];
      this.courseClassify.forEach((item,index) => {
        console.log(index, item)
        this.searchCourse(index, item);

      });
    })

  }

}
