/**
 * Created by WH1709040 on 2018/10/10.
 */
import {SharedModule} from '../../shared/shared.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
import {NgModule} from '@angular/core';
import {ROUTER_CONFIG} from './index.routes';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from '../login/login.component';

@NgModule({
  imports: [
    SharedModule,
    NgxEchartsModule,
    NgZorroAntdModule,
    FormsModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  exports: [],
  declarations: [
    IndexComponent,
    LoginComponent
  ]
})
export class IndexModule {

}
