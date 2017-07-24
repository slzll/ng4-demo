import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from "../../global-config";
import {CommonService} from "../../services/common-service.service";
import {Router} from "@angular/router";
import {JSEncrypt} from "assets/js/jsencrypt";

interface Login {
  Account: string,
  PassWord: string,
  RememberMe?: boolean
}
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  //登录
  showLogin = true;
  login:Login = {
    Account: '',
    PassWord: '',
    RememberMe: true
  };
  showError = false;
  userMessage={
    RememberMe:null
  };
  //退出
  loginOut = this.service.loginOut;

  token = this.service.AntiForgeryToken();
  encryptUserName;
  encryptPassWorld;
  userAllMessage: any;
  constructor(private service:CommonService, private router:Router) {
  }


  //表单输入变化
  inputChange() {
    this.userMessage.RememberMe = false;
  }

  //focus
  inputFocus () {
    this.showError = false;
  }


  //踢出其他地方登录账号
  kickOut(kickUserId) {
    //踢出操作
    //  console.log($.extend({}, ALL_PORT.LoginOut.data, { kickUserId: kickUserId },token));

    this.service.getData('KickOut', $.extend({}, GlobalConfig.ALL_PORT.LoginOut.data, { kickUserId: kickUserId },this.token))
      .then(function(response) {
        if (response.Type == 1) {
          //重新登录
          //console.log(response.Type);
          //window.location.reload();
          this.clickLogin(this.userMessage.RememberMe);
        }
      });
  }

  rsaEnscrypt (str,publicKey?) {
    if (!publicKey) {
      publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCa4KHNwDX44gGmmIAtRu4gjVYtGWZzcm4t+1wjUD4dn7fMLPvuK7ai4UrfDeEJE1RPwudJw+lJ6crql8wSIg7/DbTlG3ihsCT6dT9H5B9OoeR7K9VWUesaW/iyVL6HXiYOANabW14pvJATDmdq91Tfgp6PSQyvdfiRdV4r07crpQIDAQAB";
    }
    let rsaProvider = new JSEncrypt();
    rsaProvider.setPublicKey(publicKey);
    let strEncrypt = rsaProvider.encrypt(str.replace(/\+/g, '%2B'));
    return strEncrypt;
  }
  //点击登陆
  clickLogin(rememberMe) {
    this.encryptUserName =  this.rsaEnscrypt(this.login.Account);
    this.encryptPassWorld = this.rsaEnscrypt(this.login.PassWord);

    let loginParam1 = $.extend({},this.login,{Account:this.encryptUserName,PassWord:this.encryptPassWorld});
    let loginParam2 = $.extend({},this.login);
    let urlShort = rememberMe ? "LoginMe" : "LoginCode";
    let loginParam = rememberMe ? loginParam2 : loginParam1;
    console.log(loginParam);
    console.log(this.token);

    if (this.login.Account && this.login.PassWord) {
/*      this.service.getData(urlShort, $.extend({},loginParam, this.token))
        .then((data) => {
          if (data.Type == 0) {
            this.showError = true;
          } else if (data.Type == 1) {
            this.showLogin = false;
            // window.location.reload();
            //请求用户信息
            this.service.getData('LoginShort',GlobalConfig.ALL_PORT.LoginShort.data)
              .then(function(response) {

                // console.log(response);
                this.userMessage = response.Data.Model;
                this.userAllMessage = response.Data;
                if (this.userMessage.Name) {
                  this.showLogin = false;

                } else {
                  this.showLogin = true;
                  if (this.userMessage.RememberMe) {
                    this.login.RememberMe = true;
                    this.rememberPW();
                  }else {
                    this.login = {
                      Account: '',
                      PassWord: ''
                    };
                  }
                }
              });
          } else if (data.Type == 2) {
            this.service.alertMs("首次登录，请修改密码！");
            this.router.navigate(['modifyPassword']);

          } else if (data.Type == 3) {
            if (window.confirm("帐号在别的地方登录，是否踢出？")) {
              this.kickOut(data.Message);
              return true;
            } else {
              return false;
            }
          } else if (data.Type == 4) {
            this.service.alertMs("此电脑已经有用户登录，您不能用其他帐号再次登录！");
          } else if (data.Type == 5) {
            this.service.alertMs("平台当前在线人数到达上限，请稍后再试！");
          } else if (data.Type == 6) {
            this.service.alertMs(data.Message);
          } else if (data.Type == 7) {} else if (data.Type == 10) {
            this.service.alertMs("您还不是本平台成员，将为您转向您所在的平台：" + data.Message, 2);
            return;
          } else if (data.Type == 11) {
            this.service.alertMs(data.Message);
          } else if (data.Type == 12 || data.Type == 13) {
            this.service.alertMs(data.Message);
          } else {

          }
        },(data) => {
          console.log(data)
          alert("登陆异常！");
          // window.location.reload();
        });*/
      $.ajax({
        method:'POST',
        url:GlobalConfig.ALL_PORT[urlShort].url,
        data:$.extend({},loginParam,this.token),
        xhrFields: {
          withCredentials: true
        },
        success:(data)=>{
          if (data.Type == 0) {
            this.showError = true;
          } else if (data.Type == 1) {
            this.showLogin = false;
            // window.location.reload();
            //请求用户信息
            $.ajax({
              method:'post',
              url:GlobalConfig.ALL_PORT.LoginShort.url,
              data:GlobalConfig.ALL_PORT.LoginShort.data,
              xhrFields: {
                withCredentials: true
              },
              success:(response)=>{
                // console.log(response);
                this.userMessage = response.Data.Model;
                this.userAllMessage = response.Data;
                let name =response.Data.Model.Name;
                if (name) {
                  this.showLogin = false;

                } else {
                  this.showLogin = true;
                  if (this.userMessage.RememberMe) {
                    this.login.RememberMe = true;
                    this.rememberPW();
                  }else {
                    this.login = {
                      Account: '',
                      PassWord: ''
                    };
                  }
                }
              }
            })
            /*this.service.getData('LoginShort',GlobalConfig.ALL_PORT.LoginShort.data)
              .then(function(response) {

                // console.log(response);
                this.userMessage = response.Data.Model;
                this.userAllMessage = response.Data;
                if (this.userMessage.Name) {
                  this.showLogin = false;

                } else {
                  this.showLogin = true;
                  if (this.userMessage.RememberMe) {
                    this.login.RememberMe = true;
                    this.rememberPW();
                  }else {
                    this.login = {
                      Account: '',
                      PassWord: ''
                    };
                  }
                }
              });*/
          } else if (data.Type == 2) {
            this.service.alertMs("首次登录，请修改密码！");
            this.router.navigate(['modifyPassword']);

          } else if (data.Type == 3) {
            if (window.confirm("帐号在别的地方登录，是否踢出？")) {
              this.kickOut(data.Message);
              return true;
            } else {
              return false;
            }
          } else if (data.Type == 4) {
            this.service.alertMs("此电脑已经有用户登录，您不能用其他帐号再次登录！");
          } else if (data.Type == 5) {
            this.service.alertMs("平台当前在线人数到达上限，请稍后再试！");
          } else if (data.Type == 6) {
            this.service.alertMs(data.Message);
          } else if (data.Type == 7) {} else if (data.Type == 10) {
            this.service.alertMs("您还不是本平台成员，将为您转向您所在的平台：" + data.Message, 2);
            return;
          } else if (data.Type == 11) {
            this.service.alertMs(data.Message);
          } else if (data.Type == 12 || data.Type == 13) {
            this.service.alertMs(data.Message);
          } else {

          }
        },
        error:(error)=>{
          alert("登陆异常！");
          // window.location.reload();
        }

      })

    } else {
      alert("用户名或密码不能为空！");
    }
  }
  //记住密码
  rememberPW() {
    let userid = this.service.getCookie2('rememberMe', "userid");
    let pwd = this.service.getCookie2('rememberMe', 'pwd');
    // var rememberMe = $cookieStore.get("rememberMe");
    // console.log(userid, pwd);
    this.service.getData('GetLoginName', { name: userid })
      .then((response) => {
        if (response.Type == 1) {
          //console.log(response.Message);
          this.login.Account = response.Message;
          this.login.PassWord = pwd;
        }
      });
  };


  ngOnInit() {
    //请求用户信息
    this.service.getData('LoginShort', GlobalConfig.ALL_PORT.LoginShort.data)
      .then((response) => {
        this.userMessage = response.Data.Model;
        let name=response.Data.Model.Name;
        this.userAllMessage = response.Data;
        if (name) {
          this.showLogin = false;
        } else {
          this.showLogin = true;
          if (this.userMessage.RememberMe) {
            this.login.RememberMe = true;
            this.rememberPW();
          }else {
            this.login = {
              Account: '',
              PassWord: ''
            };
          }
        }
      });
  }

}
