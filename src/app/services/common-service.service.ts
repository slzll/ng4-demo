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

  //保持在线
  keepOnline() {
    setInterval(function () {
      this.http.post(GlobalConfig.ALL_PORT.KeepOnline.url).subscribe(function(response){
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

  getData(url, option?,option2?) {
    const params = new URLSearchParams();
    let header= new Headers();
    const data = Object.assign(GlobalConfig.ALL_PORT[url].data, option);
    for (let i in data) {
      if (i) {
        params.set(i, data[i]);
      }
    }
    for (let key in option2){
      if (key){
        header.append(key, option2[key])
      }
    }
    return this.http.post(GlobalConfig.ALL_PORT[url].url, params, header).map(res => res.json()).toPromise();
  }

  //防伪造请求
  AntiForgeryToken () {
    let token = new Object();
    this.getData('AntiForgeryToken',GlobalConfig.ALL_PORT.AntiForgeryToken.data,{"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"})
      .then(function(response){
      $('body').append('<div class="preventorgery"></div>');
      $('.preventorgery').html(response.html);
      let value = $('.preventorgery input').val();
      let name = $('.preventorgery input').attr('name');
      token[name] = value;
      $('div.preventorgery').remove();
      return token;
    });
    return token;
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
