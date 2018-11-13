import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MusicMissionService} from '../../core/mission/music-mission.service';
import {Music} from '../../core/entity/music';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.less']
})
export class PlayComponent implements OnInit, AfterViewInit {
  song: Music = new Music();
  playUrl: string;
  playTime: any;
  playBoxShow: boolean;
  currentTime: any;
  public isPlay: boolean;
  audio: any;

  constructor(private mission: MusicMissionService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.audio = document.getElementById('play');
    this.mission.musicChange.subscribe((currentMusic: Music) => {
      this.song = currentMusic;
      this.playUrl = `/music/song/media/${currentMusic.id}`;
      this.isPlay = true;
      this.playBoxShow = true;
      setTimeout(e => {
        this.audio.play();
      });
    });
  }

  ngAfterViewInit(): void {
  }

  songReady(e) {
    this.message.success('开始播放歌曲');
  }

  ended() {

  }

  timeUpdate(e) {
    this.currentTime = e.target.currentTime;
  }

  canPlay(e) {
    this.playTime = e.target.duration;
  }

  clickPlay() {
    this.isPlay = !this.isPlay;
    this.audio[this.isPlay ? 'play' : 'pause']();
  }

  rangeChange(evt) {
    this.currentTime = evt.currentTime;
    if (this.isPlay) {
      this.audio.pause();
      this.isPlay = false;
    }
    this.audio.currentTime = evt.currentTime;
  }

  rangeChangeEnd(evt) {
    console.log('拖拽结束', evt.currentTime);
    this.currentTime = evt.currentTime;
    this.audio.currentTime = evt.currentTime;
    setTimeout(e => {
      this.audio.play();
    });
  }
}
