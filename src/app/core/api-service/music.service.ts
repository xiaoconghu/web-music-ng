/**
 * Created by wh1709040 on 2018/10/23.
 */
import {CommonService} from './common.service';
import {Injectable} from '@angular/core';

@Injectable()
export class MusicService {

  constructor(private c: CommonService) {

  }

  public getMusicList() {
    return this.c.getData('get', `/music/song/query`);
  }


  public save(body: any) {
    return this.c.getData('post', `/music/song/insert`, body);
  }
}


