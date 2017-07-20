import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CommonServiceService {

  constructor(private http: Http) { }
  getData(url, option?) {
    const params = new URLSearchParams();
    const data = Object.assign(GlobalConfig.ALL_PORT[url].data, option);
    for (const i in data) {
      if (i) {
        params.set(i, data[i]);
      }
    }
    return this.http.post(GlobalConfig.ALL_PORT[url].url, params
    ).map(res => res.json()).toPromise();
  }

}
