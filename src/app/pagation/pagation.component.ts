import {Component, EventEmitter, Input,OnInit, Output} from '@angular/core';

interface PagationConf {
  currentPage: any, // 当前页
  totalItems: any, // 数据总数
  itemsPerPage: any, // 每页显示的条数
  pagesLength: any,
  perPageOptions: any,
  totalPages: any,
  onChange:any,
  numberOfPages:any
}

@Component({
  selector: 'app-pagation',
  templateUrl: './pagation.component.html',
  styleUrls: ['./pagation.component.css']
})
export class PagationComponent implements OnInit {
  @Output() pageConf = new EventEmitter<any>();
  conf:PagationConf;
  // 默认每页的个数
  defaultPerPage = 15;
  pageList = [];
  jumpPageNum:any;
  numberOfPages:any;

  constructor() {  }

  // pageList数组
  getPagination(newValue?, oldValue?) {
    // conf.currentPage
    if(this.conf.currentPage) {
      this.conf.currentPage = parseInt(this.conf.currentPage, 10);
    }

    if(!this.conf.currentPage) {
      this.conf.currentPage = 1;
    }

    // conf.totalItems
    if(this.conf.totalItems) {
      this.conf.totalItems = parseInt(this.conf.totalItems, 10);
    }

    // conf.totalItems
    if(!this.conf.totalItems) {
      this.conf.totalItems = 0;
      return;
    }

    // conf.itemsPerPage
    if(this.conf.itemsPerPage) {
      this.conf.itemsPerPage = parseInt(this.conf.itemsPerPage, 10);
    }
    if(!this.conf.itemsPerPage) {
      this.conf.itemsPerPage = this.defaultPerPage;
    }

    // numberOfPages
    this.conf.numberOfPages = Math.ceil(this.conf.totalItems/this.conf.itemsPerPage);

    // 如果分页总数>0，并且当前页大于分页总数
    if(this.conf.numberOfPages > 0 && this.conf.currentPage > this.conf.numberOfPages){
      this.conf.currentPage = this.conf.numberOfPages;
    }

    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
    var perPageOptionsLength = this.conf.perPageOptions.length;

    // 定义状态
    var perPageOptionsStatus;
    for(var i = 0; i < perPageOptionsLength; i++){
      if(this.conf.perPageOptions[i] == this.conf.itemsPerPage){
        perPageOptionsStatus = true;
      }
    }
    // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
    if(!perPageOptionsStatus){
      this.conf.perPageOptions.push(this.conf.itemsPerPage);
    }

    // 对选项进行sort
    this.conf.perPageOptions.sort((a, b) => (a - b));


    // 页码相关
    this.pageList = [];
    if(this.conf.numberOfPages <= this.conf.pagesLength){
      // 判断总页数如果小于等于分页的长度，若小于则直接显示
      for(i =1; i <= this.conf.numberOfPages; i++){
        this.pageList.push(i);
      }
    }else{
      // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
      // 计算中心偏移量
      var offset = (this.conf.pagesLength - 1) / 2;
      if(this.conf.currentPage <= offset){
        // 左边没有...
        for(i = 1; i <= offset + 1; i++){
          this.pageList.push(i);
        }
        this.pageList.push('...');
        this.pageList.push(this.conf.numberOfPages);
      }else if(this.conf.currentPage > this.conf.numberOfPages - offset){
        this.pageList.push(1);
        this.pageList.push('...');
        for(i = offset + 1; i >= 1; i--){
          this.pageList.push(this.conf.numberOfPages - i);
        }
        this.pageList.push(this.conf.numberOfPages);
      }else{
        // 最后一种情况，两边都有...
        this.pageList.push(1);
        this.pageList.push('...');

        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
          this.pageList.push(this.conf.currentPage - i);
        }
        this.pageList.push(this.conf.currentPage);
        for(i = 1; i <= offset / 2; i++){
          this.pageList.push(this.conf.currentPage + i);
        }

        this.pageList.push('...');
        this.pageList.push(this.conf.numberOfPages);
      }
    }
    this.pageConf.emit(this.conf);
  }

  // prevPage
  prevPage() {
    if(this.conf.currentPage > 1){
      this.conf.currentPage -= 1;
    }
    this.getPagination();
    if(this.conf.onChange) {
      this.conf.onChange();
    }
  }

  // nextPage
  nextPage () {
    if(this.conf.currentPage < this.conf.numberOfPages){
      this.conf.currentPage += 1;
    }
    this.getPagination();
    if(this.conf.onChange) {
      this.conf.onChange();
    }
  }

  // 变更当前页
  changeCurrentPage (item) {

    if(item == '...'){
      return;
    }else{
      this.conf.currentPage = item;
      this.getPagination();
      // conf.onChange()函数
      if(this.conf.onChange) {
        this.conf.onChange();
      }
    }
  }

  // 修改每页展示的条数
  changeItemsPerPage() {

    // 一发展示条数变更，当前页将重置为1
    this.conf.currentPage = 1;

    this.getPagination();
    // conf.onChange()函数
    if(this.conf.onChange) {
      this.conf.onChange();
    }
  }

  // 跳转页
  jumpToPage () {
    let num = this.jumpPageNum;
    if(num.match(/\d+/)) {
      num = parseInt(num, 10);

      if(num && num != this.conf.currentPage) {
        if(num > this.conf.numberOfPages) {
          num = this.conf.numberOfPages;
        }

        // 跳转
        this.conf.currentPage = num;
        this.getPagination();
        // conf.onChange()函数
        if(this.conf.onChange) {
          this.conf.onChange();
        }
        this.jumpPageNum = '';
      }
    }

  }

  jumpPageKeyUp (e) {
    var keycode = window.event ? e.keyCode :e.which;

    if(keycode == 13) {
      this.jumpToPage();
    }
  }

  ngOnInit() {
    var conf = this.conf;
    // 默认分页长度
    var defaultPagesLength = 9;

    // 默认分页选项可调整每页显示的条数
    // var defaultPerPageOptions = [10, 15, 20, 30, 50];

    // 默认每页的个数
    var defaultPerPage = 15;

    // 获取分页长度
    if(conf.pagesLength){
      // 判断一下分页长度
      conf.pagesLength = parseInt(conf.pagesLength, 10);

      if(!conf.pagesLength){
        conf.pagesLength = defaultPagesLength;
      }

      // 分页长度必须为奇数，如果传偶数时，自动处理
      if(conf.pagesLength % 2 === 0) {
        conf.pagesLength += 1;
      }

    }
    else {
      conf.pagesLength = defaultPagesLength
    }

    // 分页选项可调整每页显示的条数
    if(!conf.perPageOptions){
      conf.perPageOptions = defaultPagesLength;
    }
  }

}
