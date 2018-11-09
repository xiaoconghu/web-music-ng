/**
 * Created by WH1709040 on 2018/11/8.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class MusicMissionService {

  constructor() {
  }

  private music = new Subject<any>();
  /**
   * 用于接收音乐
   */
  public musicChange = this.music.asObservable();

  /**
   * 提交音乐
   * @param e<any>
   */
  public commitMusic(e: any) {
    this.music.next(e);
  }
}
