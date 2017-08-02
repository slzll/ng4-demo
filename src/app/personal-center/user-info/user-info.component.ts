import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common-service.service";
import { GlobalConfig } from "../../global-config"
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  info:any;

  constructor(private service: CommonService, private router: Router) {
  }

  //退出
  loginOut (str) {
    let headers={"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"};
    let token = this.service.AntiForgeryToken();
    this.service.getData('LoginOut',$.extend({},GlobalConfig.ALL_PORT.LoginOut.data,token),headers)
      .then((response) => {
        this.router.navigate(['/']);
        window.location.reload();
      })
  }

  ngOnInit() {
    //请求用户信息
    this.service.getData('LoginLong', GlobalConfig.ALL_PORT.LoginLong.data)
      .then(response => {
        this.info = response.Data;
      });
   /* $.ajax({
      method: 'POST',
      url:GlobalConfig.ALL_PORT.LoginLong.url,
      data: GlobalConfig.ALL_PORT.LoginLong.data,
      xhrFields: {
        withCredentials: true
      },
      success:(res)=>{
        this.info = res.Data;
      }
    })*/
  }

}
