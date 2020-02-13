import {CommonService} from './common.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CdInfoService {

  constructor(private c: CommonService) {

  }

  public getMusicList() {
    return this.c.getData('get', `/music/cd/query`);
  }


  public save(body: any) {
    return this.c.getData('post', `/music/cd/insert`, body);
  }

  deleteMusicById(id) {
    return this.c.getData('delete', `/music/cd/delete/${id}`);
  }

  deleteByBatch(ids: any) {
    return this.c.getData('post', `/music/cd/deleteByBatch`, ids);
  }

  getUserById(songId: any) {
    return this.c.getData('get', `/music/cd/queryById/${songId}`);
  }

  update(body: any) {
    return this.c.getData('put', `/music/cd/update`, body);
  }
}
