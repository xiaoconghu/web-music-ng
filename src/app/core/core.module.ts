/**
 * Created by wh1709040 on 2018/9/15.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketIO, WebSocketFactory} from './utils/websocket.service';
import {UserService} from './api-service/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: UserService, useClass: UserService},
    {
      provide: SocketIO, useFactory: () => {
        return WebSocketFactory.forRoot();
      }
    }
  ]
})
export class CoreModule {
}
