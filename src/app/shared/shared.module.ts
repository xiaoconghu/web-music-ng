/**
 * Created by wh1709040 on 2018/9/15.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
  entryComponents: [TableComponent],
  providers: []
})
export class SharedModule {
}
