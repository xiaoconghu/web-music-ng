/**
 * Created by wh1709040 on 2018/9/15.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NwFormComponent} from './nw-form';
import {TimePipe} from './pipe/time.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TableComponent, NwFormComponent, TimePipe],
  exports: [
    TableComponent,
    NwFormComponent,
    TimePipe,
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [TableComponent, NwFormComponent],
  providers: []
})
export class SharedModule {
}
