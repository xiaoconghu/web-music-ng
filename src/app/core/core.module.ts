/**
 * Created by wh1709040 on 2018/9/15.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketIO, WebSocketFactory} from './utils/websocket.service';
import {UserService} from './api-service/user.service';
import {MusicService} from './api-service/music.service';
import {CommonService} from './api-service/common.service';
import {MusicMissionService} from './mission/music-mission.service';
import {SingerService} from './api-service/singer.service';
import {CdInfoService} from './api-service/cd-info.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: UserService, useClass: UserService},
    {provide: MusicService, useClass: MusicService},
    {provide: SingerService, useClass: SingerService},
    {provide: CdInfoService, useClass: CdInfoService},
    {provide: CommonService, useClass: CommonService},
    {
      provide: SocketIO, useFactory: () => {
        return WebSocketFactory.forRoot();
      }
    }
  ]
})
export class CoreModule {
}
