import {Result} from '../entity/result';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/**
 * Created by wh1709040 on 2018/10/23.
 */
@Injectable()
export class CommonService {

  constructor(private $http: HttpClient) {
  }

  public getData(method, url, body = {}) {
    return new Promise((resolve, reject) => {
      this.$http[method](url, body).subscribe((result: Result) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }
}
