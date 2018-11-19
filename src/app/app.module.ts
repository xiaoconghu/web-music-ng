import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './app.routes';
import {CoreModule} from './core/core.module';
import {NoopInterceptor} from './noop-interceptor';
import {NgxEchartsModule} from 'ngx-echarts';
import {MusicMissionService} from './core/mission/music-mission.service';
import {SharedModule} from 'wx-music';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    CoreModule,
    SharedModule,
    NgxEchartsModule,
    RouterModule.forRoot(ROUTER_CONFIG)
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true},
    MusicMissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
