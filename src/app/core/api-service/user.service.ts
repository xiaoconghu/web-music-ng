/**
 * Created by WH1709040 on 2018/10/11.
 */
import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private commonService: CommonService) {
  }

  public login(body) {
    return this.commonService.getData('post', `/music/user/login`, body);
  }

  public register(body) {
    return this.commonService.getData('post', `/music/user/register`, body);
  }

  public logout(body) {
    return this.commonService.getData('post', `/music/user/logout`, body);
  }

  public updateUser(body) {
    return this.commonService.getData('post', `/music/user/updateUser`, body);
  }

  public getAllUser() {
    return this.commonService.getData('get', `/music/user/getAllUser`);
  }

  public deleteUserById(id) {
    return this.commonService.getData('get', `/music/user/deleteUserById/${id}`);
  }

  public deleteUserByBatch(ids) {
    return this.commonService.getData('post', `/music/user/deleteUserByBatch`, ids);
  }

  getUserById(id: any) {
    return this.commonService.getData('get', `music/user/getUserById/${id}`);
  }
}
