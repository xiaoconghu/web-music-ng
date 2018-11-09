import {Component, OnInit} from '@angular/core';
import {MusicMissionService} from '../../core/mission/music-mission.service';
import {Music} from '../../core/entity/music';
import {NzMessageService} from 'ng-zorro-antd';
import {CommonUtils} from '../../core/utils/commonUtils';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.less']
})
export class PlayComponent implements OnInit {
  song: Music = new Music();
  playUrl: string;
  playTime: any;
  playBoxShow: boolean;
  currentTime: any;
  public isPlay: boolean;

  constructor(private mission: MusicMissionService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.mission.musicChange.subscribe((currentMusic: Music) => {
      this.song = currentMusic;
      this.playUrl = `/music/song/media/${currentMusic.id}`;
      this.isPlay = true;
      this.playBoxShow = true;
      setTimeout(e => {
        this.play();
      });
    });
  }

  songReady(e) {
    this.message.success('开始播放歌曲');
    this.playTime = document.getElementById('play')['duration'];
    console.log(this.playTime);
  }

  ended() {

  }

  timeUpdate(e) {
    this.currentTime = e.target.currentTime;
    // console.log(this.currentTime);
    console.log(this.currentTime / this.playTime);
  }

  play() {
    document.getElementById('play')[this.isPlay ? 'play' : 'pause']();
  }

  canPlay(e) {
    this.playTime = e.target.duration;
    console.log(CommonUtils.dateFmt('mm:ss', new Date(this.playTime)));
  }

  clickPlay() {
    this.isPlay = !this.isPlay;
    this.play();
  }

}
