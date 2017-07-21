import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common-service.service";
import { GlobalConfig } from "../../global-config"

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  info:any;
  //退出
  loginOut = this.service.loginOut;
  constructor(private service: CommonService) {
  }

  ngOnInit() {
    this.service.getData('LoginLong', GlobalConfig.ALL_PORT.LoginLong.data)
      .then(response => {
        this.info = response.Data;
      });
  }

}
