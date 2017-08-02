import {Component, ContentChild, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../services/common-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalConfig} from "../../global-config";
import { PagationComponent } from "../../pagation/pagation.component";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit,OnChanges {
  @Input() articleListData:any;
  @Input() pagationConf:any;
  @ContentChild(PagationComponent) pagation:PagationComponent;

  constructor(private service:CommonService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    console.log(this.pagation)
    console.log(this.pagationConf)
    this.pagation.conf = this.pagationConf;
    this.pagationConf = this.pagation.conf;
    console.log(this.pagation.conf.totalItems)
  }
  ngOnChanges(e){
    console.log(e)
    // this.pagation.getPagination();
  }

}
