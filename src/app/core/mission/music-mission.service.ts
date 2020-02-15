/**
 * Created by WH1709040 on 2018/11/8.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class MusicMissionService {

  private music = new Subject<any>();
  /**
   * 用于接收音乐集合
   */
  public musicChange = this.music.asObservable();
  private musicList = new Subject<any>();
  /**
   * 用于接收当前音乐
   */
  public musicListChange = this.musicList.asObservable();
  public _musicList: any[] = [];

  constructor() {
  }

  private _currentMusicIndex;

  get currentMusicIndex() {
    return this._currentMusicIndex;
  }

  set currentMusicIndex(value) {
    this._currentMusicIndex = value;
  }

  /**
   * 提交当前音乐
   * param e<any>
   */
  public commitMusic(e: any) {
    this._currentMusicIndex = this._musicList.findIndex(item => item.id === e.id);
    this.music.next(e);
  }

  /**
   * 提交音乐集合
   * param e<any>
   */
  public commitMusicList(e: any) {
    this._musicList = e;
    this.musicList.next(e);
  }
}
