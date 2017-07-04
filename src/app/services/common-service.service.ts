import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CommonServiceService {

  constructor(private http: Http) { }
  getData(url, option?): Promise<any> {
    let params = new URLSearchParams();
    const data = Object.assign(GlobalConfig.ALL_PORT[url].data, option);
    for (let i in data) {
      params.set(i, data[i]);
    }
    return this.http.post(GlobalConfig.ALL_PORT[url].url, params
    ).toPromise().then(function (r) {
      return r.json().Data;
    });
  }

}
