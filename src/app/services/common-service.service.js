"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_config_1 = require("../global-config");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var CommonServiceService = (function () {
    function CommonServiceService(http) {
        this.http = http;
    }
    CommonServiceService.prototype.getData = function (url, option) {
        var params = new http_1.URLSearchParams();
        var data = Object.assign(global_config_1.GlobalConfig.ALL_PORT[url].data, option);
        for (var i in data) {
            if (i) {
                params.set(i, data[i]);
            }
        }
        return this.http.post(global_config_1.GlobalConfig.ALL_PORT[url].url, params).map(function (res) { return res.json(); }).toPromise();
    };
    return CommonServiceService;
}());
CommonServiceService = __decorate([
    core_1.Injectable()
], CommonServiceService);
exports.CommonServiceService = CommonServiceService;
