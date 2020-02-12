import {CommonService} from './common.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SingerService {
  constructor(private c: CommonService) {

  }

  public getMusicList() {
    return this.c.getData('get', `/music/song/query`);
  }


  public save(body: any) {
    return this.c.getData('post', `/music/singer/insert`, body);
  }

  deleteMusicById(id) {
    return this.c.getData('delete', `/music/song/delete/${id}`);
  }

  deleteByBatch(ids: any) {
    return this.c.getData('post', `/music/song/deleteByBatch`, ids);
  }

  getUserById(songId: any) {
    return this.c.getData('get', `/music/song/queryById/${songId}`);
  }

  update(body: any) {
    return this.c.getData('put', `/music/song/update`, body);
  }
}
