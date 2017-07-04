import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  vmnews: number;
  newsTitle: string;
  newsData: any;
  activeNewsData: object;
  policyTitle: string;
  policyData: any;
  activePolicyData: object;
  noticeTitle: string;
  noticeData: any;
  activeNoticeData: object;
  path: string;
  photoData: any;
  activePhotoData: object;

  constructor(private service: CommonServiceService, private router: Router, private route: ActivatedRoute) {
    this.vmnews = 1;
  }

  isNew(createDate: string): boolean {
    // 当前时间
    const date = Date.parse(new Date().toString());
    // 正则
    const reg = /^.+?\((.+?)\).*$/;
    const flag = Math.round((date - parseInt(reg.exec(createDate)[1])) / (1000 * 60 * 60 * 24)) < 31;
    // console.log(flag);
    return flag;
  };
  newsDetail(path, Id): void {
    this.router.navigate([path, {ID: Id }]);
  }

  ngOnInit() {
    this.service.getData('ArticleList', { CategoryId: 3, page: 1, rows: 8, desc: 'desc', sort: 'Sort'}).then(res => {
      this.newsTitle = res.CategoryName;
      this.newsData = res.ListData;
      this.activeNewsData = this.newsData.shift();
    });
    this.service.getData('ArticleList', { CategoryId: 23, page: 1, rows: 8, desc: 'desc', sort: 'Sort'}).then(res => {
      this.policyTitle = res.CategoryName;
      this.policyData = res.ListData;
      this.activePolicyData = this.policyData.shift();
    });
    this.service.getData('noticeAnnouncement', { CategoryId: 1, page: 1, rows: 8, desc: 'desc', sort: 'Sort'}).then(res => {
      this.noticeTitle = res.TitleNav;
      this.noticeData = res.ListData;
      this.activeNoticeData = this.noticeData.shift();
    });
    this.service.getData('ArticleCarousel', {rows: 5, ids: 26, img: true, page: 1, desc: 'desc', sort: 'Sort'}).then(res => {
      this.path = res.Path;
      this.photoData = res.ListData;
      this.activePhotoData = this.photoData.shift();
    });

  }

}
