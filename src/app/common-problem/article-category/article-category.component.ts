import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonService} from "../../services/common-service.service";
import {GlobalConfig} from "../../global-config";

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.css']
})
export class ArticleCategoryComponent implements OnInit {
  @Input() categoryData:any;
  @Output() id:EventEmitter<number> = new EventEmitter<number>()

  constructor(private service:CommonService) { }
  refreshList(id){
    this.id.emit(id);
  }

  ngOnInit() {

  }

}
