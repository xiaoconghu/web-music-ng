import {Component, OnInit} from '@angular/core';
import {MusicMissionService} from '../../core/mission/music-mission.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.less']
})
export class MusicComponent implements OnInit {

  constructor(private mission: MusicMissionService) {
  }

  ngOnInit() {
    this.mission.musicChange.subscribe(e => {
      console.log(e);
    });
  }

}
