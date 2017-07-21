import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common-service.service';

@Component({
  selector: 'app-statistical-ranking',
  templateUrl: './statistical-ranking.component.html',
  styleUrls: ['./statistical-ranking.component.css']
})
export class StatisticalRankingComponent implements OnInit {
  courseRankData: any;
  unitRankData: any;
  userRankData: any;

  constructor(private service: CommonService) { }


  ngOnInit() {
    // 课程排行
    this.service.getData('CourseClickRank', {rows: 10})
        .then(response => {
          this.courseRankData = response.Data.ListData;
        });
    // 单位排行
    this.service.getData('LeftGroupRank', {rows: 10})
        .then(response => {
          this.unitRankData = response.Data.ListData;
         });
    // 个人排行
    this.service.getData('LeftUserRank', {rows: 10})
        .then(response => {
          this.userRankData = response.Data.ListData;
        });
  }

}
