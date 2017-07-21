import { Injectable } from '@angular/core';
import {API} from "../api";
import {Http} from "@angular/http";
import * as $ from 'jquery';
import { JSEncrypt } from 'assets/js/jsencrypt.js';

@Injectable()
export class AntityForgeryService {

  constructor(private http:Http) {
    $("form.forgerytoken").each(function (i, v) {
      this.AntiForgeryToken(v);
    });
    $("input.forgerytoken").each(function () {
      this.AntiForgeryToken2(this);
    });
    /*
    * 加密
    * */
    Object.assign(String.prototype,{
      rsaEnscrypt (publicKey) {
        if (!publicKey) {
          publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCa4KHNwDX44gGmmIAtRu4gjVYtGWZzcm4t+1wjUD4dn7fMLPvuK7ai4UrfDeEJE1RPwudJw+lJ6crql8wSIg7/DbTlG3ihsCT6dT9H5B9OoeR7K9VWUesaW/iyVL6HXiYOANabW14pvJATDmdq91Tfgp6PSQyvdfiRdV4r07crpQIDAQAB";
        }
        let rsaProvider = new JSEncrypt();
        rsaProvider.setPublicKey(publicKey);
        let strEncrypt = rsaProvider.encrypt(this.replace(/\+/g, '%2B'));
        return strEncrypt;
      }
    })
  }
  AntiForgeryToken(formid?:any) {
    if (!!formid) {
      $.ajax({
        url: API.API_URL + "/page/AntiForgeryToken",
        type: "POST",
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          if (typeof formid === "string") {
            if ($("#" + formid).find("[name='__RequestVerificationToken']").length > 0) {
              $("#" + formid).find("[name='__RequestVerificationToken']").remove();
            }
            $("#" + formid).prepend(data.html);
          }
          else {
            if ($(formid).find("[name='__RequestVerificationToken']").length > 0) {
              $(formid).find("[name='__RequestVerificationToken']").remove();
            }
            $(formid).prepend(data.html);
          }
        }
      });
    }
  };
  AntiForgeryToken2(the) {
    if (!!the) {
      $.ajax({
        url: API.API_URL + "/page/AntiForgeryToken",
        type: "POST",
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          the.outerHTML = data.html;
        }
      });
    }
  };

  AntiForgeryToken3($selector) {
    $selector = $($selector);
    if ($selector.length > 0) {
      $.ajax({
        url: API.API_URL + "/page/AntiForgeryToken",
        type: "POST",
        async: true,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          if ($selector.find("[name='__RequestVerificationToken']").length > 0) {
            $selector.find("[name='__RequestVerificationToken']").remove();
          }
          $selector.prepend(data.html);
        }
      });
    }
  };

  AddAntiForgeryToken(data, $outer) {
    if (!!$outer) {
      data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]', $outer).val();
      return data;
    }
    else {
      data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
      return data;
    }
  };
}
