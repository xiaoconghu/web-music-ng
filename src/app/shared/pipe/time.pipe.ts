/**
 * Created by WH1709040 on 2018/11/9.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {CommonUtils} from '../../core/utils/commonUtils';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args): any {
    return CommonUtils.dateFmt('mm:ss', new Date(value));
  }
}
