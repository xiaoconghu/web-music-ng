/**
 * Created by wh1709040 on 2018/9/15.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlarmService} from './api-service/alarm-service';
import {SocketIO, WebSocketFactory} from './utils/websocket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: AlarmService, useClass: AlarmService},
    {
      provide: SocketIO, useFactory: () => {
        return WebSocketFactory.forRoot();
      }
    }
  ]
})
export class CoreModule {
}
