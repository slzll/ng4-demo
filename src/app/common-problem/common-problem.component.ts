import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../services/common-service.service";
import {GlobalConfig} from "../global-config";
import {ActivatedRoute, Router} from "@angular/router";
import {PagationComponent} from "../pagation/pagation.component";

@Component({
  selector: 'app-common-problem',
  templateUrl: './common-problem.component.html',
  styleUrls: ['./common-problem.component.css']
})
export class CommonProblemComponent implements OnInit {
  categoryData:any;
  categoryId:number;
  search = '';
  params = {
    categoryId:this.categoryId,
    page:1,
    rows:20
  };
  searchText = '';
  tipText = '';
  paginationConf = $.extend({},GlobalConfig.paginationConf,{itemsPerPage:this.params.rows});
  articleListData: any;

  constructor(private service:CommonService,private route:ActivatedRoute,private router:Router) {  }
  refreshList (option?:any) {
    let options={}
    if (typeof option== 'number'){
      options['categoryId'] = option;
    }else{
      options = option;
    }


    this.service.getData('ArticleList',$.extend({}, GlobalConfig.ALL_PORT.ArticleList.data,this.params,options))
      .then((response) =>{
        this.articleListData = response.Data;
        this.paginationConf.totalItems = response.Data.Count;
      });
  };
  searchNow () {
    if(this.searchText ==''){
      this.tipText = "输入不能为空";
    }else{
      this.router.navigate(['search', this.searchText]);
    }
  };
  hideTip () {
    this.tipText = "";
  }

  getConf(e){
    console.log(e)
    this.refreshList({page:e.currentPage})
  }
  ngOnInit() {
    //判断能否访问
    this.service.isVisit();
    //保持在线
    this.service.keepOnline();
    //获取文章分类
    this.service.getData('ArticleCategory',$.extend({}, GlobalConfig.ALL_PORT.ArticleCategory.data))
      .then((response)=>{
        this.categoryData = response.Data;
        //console.log($scope.categoryData);
      });
    this.route.params.subscribe(params=>{
      this.categoryId = params.Id;
    })
    if (!this.categoryId){
      this.categoryId = 0;
    }
    this.refreshList();
  }

}
