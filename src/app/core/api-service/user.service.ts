/**
 * Created by WH1709040 on 2018/10/11.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../entity/result';

@Injectable()
export class UserService {

  constructor(private $http: HttpClient) {
  }

  public login(body) {
    return this.getData('post', `/music/user/login`, body);
  }

  public register(body) {
    return this.getData('post', `/music/user/register`, body);
  }

  public logout(body) {
    return this.getData('post', `/music/user/logout`, body);
  }

  public updateUser(body) {
    return this.getData('post', `/music/user/updateUser`, body);
  }

  public getAllUser() {
    return this.getData('get', `/music/user/getAllUser`);
  }

  public deleteUserById(id) {
    return this.getData('get', `/music/user/deleteUserById/${id}`);
  }

  public deleteUserByBatch(ids) {
    return this.getData('post', `/music/user/deleteUserByBatch`, ids);
  }

  getUserById(id: any) {
    return this.getData('get', `music/user/getUserById/${id}`);
  }

  private getData(method, url, body = {}) {
    return new Promise((resolve, reject) => {
      this.$http[method](url, body).subscribe((result: Result) => {
        result.code === 0 ? resolve(result) : reject(result);
      });
    });
  }


}
