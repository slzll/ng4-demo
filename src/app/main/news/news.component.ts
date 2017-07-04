import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from '../../global-config';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
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

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
    this.vmnews = 1;
  }
  getData(urlSource: string, option: any): Promise<any> {
    let params = new URLSearchParams();
    const data = Object.assign(GlobalConfig.ALL_PORT[urlSource].data,
        { page: 1, rows: 8, desc: 'desc', sort: 'Sort'}, option);
    for (let i in data) {
      params.set(i, data[i]);
    }
    return this.http.post(GlobalConfig.ALL_PORT[urlSource].url, params
    ).toPromise().then(function (r) {
      return r.json().Data;
    });
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
    this.getData('ArticleList', { CategoryId: 3}).then(res => {
      this.newsTitle = res.CategoryName;
      this.newsData = res.ListData;
      this.activeNewsData = this.newsData.shift();
    });
    this.getData('ArticleList', { CategoryId: 23}).then(res => {
      this.policyTitle = res.CategoryName;
      this.policyData = res.ListData;
      this.activePolicyData = this.policyData.shift();
    });
    this.getData('noticeAnnouncement', { CategoryId: 1}).then(res => {
      this.noticeTitle = res.TitleNav;
      this.noticeData = res.ListData;
      this.activeNoticeData = this.noticeData.shift();
    });
    this.getData('ArticleCarousel', {rows: 5, ids: 26, img: true}).then(res => {
      this.path = res.Path;
      this.photoData = res.ListData;
      this.activePhotoData = this.photoData.shift();
    });

  }

}
