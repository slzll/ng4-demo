import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-special-training',
  templateUrl: './special-training.component.html',
  styleUrls: ['./special-training.component.css']
})
export class SpecialTrainingComponent implements OnInit {
  specialTraining: Array<Object>;
  vm: number;

  constructor(private service: CommonServiceService) {
    this.vm = 1;
  }

  ngOnInit() {
    this.service.getData('ArticleList',
        {page: 1, rows: 12, CategoryId: 27, desc: 'desc', sort: 'Sort', wordLimt: 20}).then(res => {

      this.specialTraining = res.ListData;
      // console.log(this.requiredCourseData);
    });
  }

}
