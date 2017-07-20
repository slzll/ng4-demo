/*
 * Directive: 指令模块
 * ElementRef: 获取节点
 * Input: 获取输入内容
 * Renderer: 渲染新节点
 * HostListener: 这是监听事件的, 绑定时间
 *
 * 注意:
 * 1. 指令的名称要使用中括号括起来
 * 2. html中使用的时候, 不需要中括号
 * 3. 构造模板中传递参数的时候, 如果是字符串, 那么要单引号: [myHighlight]="'blue'"
 */
import {Directive, ElementRef, HostListener, Input, AfterViewInit, HostBinding} from '@angular/core';

@Directive({
  selector: '[errSrc]'
})
export class ErrSrcDirective implements AfterViewInit {
  @Input() errSrc:string;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.src === 'undefined') {
      console.log(this.el.nativeElement.src)
      console.log(this.errSrc)
      this.el.nativeElement.src = this.errSrc;
    }
  }

  @HostListener('error', ['$event'])
  changeSrc() {
      // console.log(this.el.nativeElement.src)
      // console.log(this.errSrc)
      this.el.nativeElement.src = this.errSrc;
  }


}
