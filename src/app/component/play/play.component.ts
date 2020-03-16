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
  isLoop = true;

  constructor(private mission: MusicMissionService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.audio = document.getElementById('play');
    this.mission.musicChange.subscribe((currentMusic: Music) => {
      this.song = currentMusic;
      this.playUrl = this.song.songUrl;
      this.playBoxShow = true;
      this.playCurrentMusic();

    });
  }

  ngAfterViewInit(): void {
  }

  songReady(e) {
    this.message.success('开始播放歌曲');
  }

  ended() {
    console.log('播放结束');
    this.isPlay = false;
    if (this.isLoop) {
      this.next();
    }
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

  rangeChangeStart() {
    console.log('拖拽开始');
    this.audio.pause();
    this.isPlay = false;
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
    this.playCurrentMusic();
  }

  prev() {
    let index = this.mission.currentMusicIndex - 1;
    if (index < 0) {
      index = this.mission._musicList.length - 1;
    }
    this.mission.currentMusicIndex = index;
    this.getUrlAndPlay();
  }

  next() {
    let index = this.mission.currentMusicIndex + 1;
    if (index > this.mission._musicList.length - 1) {
      index = 0;
    }
    this.mission.currentMusicIndex = index;
    this.getUrlAndPlay();
  }

  getUrlAndPlay() {
    this.audio.pause();
    this.song = this.mission._musicList[this.mission.currentMusicIndex];
    // this.playUrl = `/music/song/media/${this.song.id}`;
    this.playUrl = this.song.songUrl;
    this.playCurrentMusic();
  }

  playCurrentMusic() {
    setTimeout(e => {
      this.audio.play();
      this.isPlay = true;
    });
  }

  toggleLoop() {
    this.isLoop = !this.isLoop;
    if (this.isLoop) {
      this.message.info('开启循环播放');
    } else {
      this.message.info('关闭循环播放');
    }
  }
}
