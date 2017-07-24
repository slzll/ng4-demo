import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { API } from '../api'
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import {unescape} from "querystring";
import { CookieService } from 'ngx-cookie';
import {Router} from "@angular/router";
import {AntityForgeryService} from "./antity-forgery.service";

@Injectable()
export class CommonService {

  constructor(private http: Http,private cookie: CookieService,private router:Router,private antiForgeryToken:AntityForgeryService) { }

  //警告功能 - start
  /**
   * this is a method replacing the alert and confirm
   * @param  {object or string} options       the content of alert things
   * @param  {number} opt_warntype  chooce alert type or confirm type or original
   * @param  {function} opt_callback1 return function of confirm
   * @param  {function} opt_callback2 return function of cancle
   * @return {html}               change the alert style
   */
  alertMs (options, opt_warntype?, opt_callback1?, opt_callback2?) {
    let option = {
      warnType: 1, //1 为alert型; 2 为confirm型; 3 为系统alert型
      Title: "消息",
      Message: "错误",
      theme: "green" //"red","blue","green","yellow"可以在generateCSS的themes添加对象
    };
    let generate = {
      HTML: function (option) {
        var $html = "" +
          "<div id=\"msOut\">" +
          "    <div id=\"msBox\">" +
          "        <div class=\"msTitle\">" + option.Title + "</div>" +
          "        <div class=\"msMessage\">" + option.Message + "</div>" +
          "        <div class=\"msBtn\">" +
          "            <span class=\"msConfirm\">确定</span>" +
          (option.warnType == 2 ? "<span class=\"msReject\">取消</span>" : "") +
          "        </div>" +
          "    </div>" +
          "    <div class=\"msLayer\"></div>" +
          "</div>";
        $('body').append($html);
        this.CSS(option);
      },
      CSS: function (option) {
        let themes = { "red": "#CC3300", "blue": "#99CCFF", "green": "#8bb166", "yellow": "#FFFF66" };
        let themeColor = themes[option.theme];
        for (let color in themes) {
          if (color == option.theme) {
            themeColor = themes[color];
            break;
          }
        }
        $("#msOut").css({ "width": '100%', "height": '100%', "zIndex": '99999', "position": 'fixed', "top": '0', "left": '0' });
        $(".msLayer").css({ "width": '100%', "height": '100%', "filter": 'Alpha(opacity=40)', "backgroundColor": '#000', "opacity": '0.4' });
        $("#msBox").css({ "width": '500px', "height": '300px', "zIndex": '99999', "position": 'absolute', "opacity": "0" });
        $(".msTitle").css({ "display": 'block', "fontSize": '14px', "color": '#444', "padding": '10px 15px', "backgroundColor": '#f0f4f7', "borderRadius": '15px 15px 0 0', "borderBottom": '3px solid ' + themeColor, "fontWeight": 'bold' });
        $(".msMessage").css({ "padding": " 50px", "line-height": " 22px", "background-color": "#393D49", "color": "#fff", "font-weight": "300", "overflow": "hidden", "text-overflow": "ellipsis" });
        $(".msBtn").css({ "padding": '15px 0 10px 0', "borderRadius": '0 0 15px 15px', "textAlign": 'center', "background-color": "#f0f4f7" });
        $(".msConfirm").css({ "display": "inline-block", "height": "28px", "line-height": "28px", "margin": "0 6px", "padding": "0 15px", "border": "1px solid" + themeColor, "background-color": themeColor, "color": " #fff", "border-radius": "2px", "font-weight": "400", "cursor": "pointer", "text-decoration": "none" });
        $(".msReject").css({ "display": "inline-block", "height": "28px", "line-height": "28px", "margin": "0 6px", "padding": "0 15px", "border": "1px solid #dedede", "background-color": "#f1f1f1", "color": "#333", "border-radius": "2px", "font-weight": "400", "cursor": "pointer", "text-decoration": "none" });
        this.Event(opt_callback1, opt_callback2);
      },
      Event: function (opt_callback1, opt_callback2) {
        let $width = document.documentElement.clientWidth;  //屏幕宽
        let $height = document.documentElement.clientHeight; //屏幕高
        let boxWidth = $("#msBox").width();
        let boxHeight = $("#msBox").height();
        $("#msBox").css({ "left": ($width - boxWidth) / 2 + "px" });
        $("#msBox").stop().animate({ "top": ($height - boxHeight) / 2 + "px", "left": ($width - boxWidth) / 2 + "px", "opacity": "1" }, 300);
        $(".msConfirm").click(function () {
          $("#msBox").stop().animate({ "top": "0", "opacity": "0.2" }, 300, function () { $("#msOut").remove(); });
          if (typeof opt_callback1 === "function") {
            opt_callback1();
            $('.msOut').remove()
          }
        });
        $(".msReject").click(function () {
          $("#msBox").stop().animate({ "top": "0", "opacity": "0.2" }, 300, function () { $("#msOut").remove(); });
          if (typeof opt_callback2 === "function") {
            opt_callback2();
            $('.msOut').remove()
          }
        });
      }
    }
    if (typeof options === "string") {
      option.Message = options;
      if (typeof opt_warntype === "number") {
        if (opt_warntype != 3) {
          option = $.extend(option, { warnType: opt_warntype });
          generate.HTML(option);
        } else {
          alert(option.Message);
        }
      } else if (typeof opt_warntype === "function") {
        opt_callback1 = opt_warntype;
        generate.HTML(option);
      } else {
        generate.HTML(option);
      }
    } else if (typeof options === "object") {
      option = $.extend(option, options);
      if (typeof opt_warntype === "number") {
        if (opt_warntype != 3) {
          option = $.extend(option, { warnType: opt_warntype });
          generate.HTML(option);
        } else {
          alert(option.Message);
        }
      } else if (typeof opt_warntype === "function") {
        option = $.extend(option, options);
        opt_callback1 = opt_warntype;
        generate.HTML(option);
      } else {
        generate.HTML(option);
      }
    }

  };

  //保持在线
  keepOnline() {
    setInterval( ()=> {
      this.getData('KeepOnline').then((response) => {
      });
    },60000);
  }
  //判断能否访问
  isVisit () {

    this.getData('Authorization',GlobalConfig.ALL_PORT.Authorization.data)
      .then((response)=>{
      if(response.isauth==true){
      }else {
        alert("请先登录！");
        this.router.navigate(['/']);
      }
    })
  }
  //退出
  loginOut (str) {
    let headers={"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"};
    this.getData('LoginOut',Object.assign({},GlobalConfig.ALL_PORT.LoginOut.data,this.antiForgeryToken.AntiForgeryToken()),headers)
      .then(function(response){
      this.router.navigate(['/']);
      window.location.reload();
    })
  }
  //获取cookie
  GetQueryString (name,value){
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = value.match(reg);
    if (r !== null) {
      return unescape(String(r[2]));
    }
    return null;
  }

  getCookie (name, pro) {
    let headers=new Headers();
    headers.append('Content-Type',"application/x-www-form-urlencoded;charset=UTF-8");
    if (this.cookie.get(name)) {
      let cookie = this.cookie.get(name);
      if (pro) {
        return this.GetQueryString(pro, cookie);
      } else {
        return cookie;
      }
    } else if (document.location.protocol + "//" + document.location.host != API.API_URL.substring(0, API.API_URL.lastIndexOf('/'))) {
      this.http.post(API.API_URL + "/Page/RememberMe", null, {headers: headers})
        .map(res => res.json()).toPromise().then((response) => {
          if (response.Type == 1) {
            this.cookie.put(name, response.Message);
            let cookie = this.cookie.get(name);
            //console.log(cookies);
            if (pro) {
              return this.GetQueryString(pro, cookie);
            } else {
              return cookie;
            }
          }
        })
    }
  }

  getCookie2 (name, pro, cookies?) {
    cookies = cookies || document.cookie;
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");  // (^| )longguid=([^;]*)(;|$)
    arr = cookies.match(reg);
    if (pro) {
      let cookie;
      if (arr) {
        cookie = unescape(arr[2]);
        let ar, re = new RegExp("(=|&| |^)" + pro + "=([^&;]*)(&|;|$)");
        ar = cookie.match(re);
        if (ar) {
          return unescape(ar[2]);
        }
        else return null;
      }
      else
        return null;
    }
    else {
      if (arr)
        return unescape(arr[2]);
      else
        return null;
    }
  };

  getData(url, option?,option2?) {
    const params = new URLSearchParams();
    let header= new Headers();
    if (option){
      const data = Object.assign(GlobalConfig.ALL_PORT[url].data, option);
      for (let i in data) {
        if (i) {
          params.set(i, data[i]);
        }
      }
    }
    if (option2){

      for (let key in option2){
        if (key){
          header.append(key, option2[key])
        }
      }
    }



    return this.http.post(GlobalConfig.ALL_PORT[url].url, params, header).map(res => res.json()).toPromise();
  }

  //防伪造请求
  AntiForgeryToken () {
    let token = new Object();
    $.ajax({
      method:'get',
      url:GlobalConfig.ALL_PORT.AntiForgeryToken.url,
      data:GlobalConfig.ALL_PORT.AntiForgeryToken.data,
      headers:{
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: function(response){
        $('body').append('<div class="preventorgery"></div>');
        $('.preventorgery').html(response.html);
        var value = $('.preventorgery input').val();
        var name = $('.preventorgery input').attr('name');
        token[name] = value;
        $('div.preventorgery').remove();
        return token;
      }
    })
    return token;
/*    this.getData('AntiForgeryToken',GlobalConfig.ALL_PORT.AntiForgeryToken.data,{"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"})
      .then(function(response){
      $('body').append('<div class="preventorgery"></div>');
      $('.preventorgery').html(response.html);
      let value = $('.preventorgery input').val();
      let name = $('.preventorgery input').attr('name');
      token[name] = value;
      $('div.preventorgery').remove();
      return token;
    });
    return token;*/
  }

  dFormat(i) { return i < 10 ? "0" + i.toString() : i; }
  //过滤日期
  dateFilter (str,value) {
    if (value == "yyyy-MM-dd HH:mm:ss") {
      let d = eval('new ' + str.substr(1, str.length - 2));
      let ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
      for (let i = 0; i < ar_date.length; i++) ar_date[i] = this.dFormat(ar_date[i]);
      return ar_date.slice(0, 3).join('-') + ' ' + ar_date.slice(3).join(':');
    } else if (value == "yyyy-MM-dd") {
      let d = eval('new ' + str.substr(1, str.length - 2));
      let ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
      for (var i = 0; i < ar_date.length; i++) ar_date[i] = this.dFormat(ar_date[i]);
      return ar_date.join('-');
    }
  }

}
