import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FormItem, FormOperate} from './nw-form.config';

@Component({
  selector: 'nw-form',
  templateUrl: './nw-form.component.html',
  styleUrls: ['./nw-form.component.less']
})
export class NwFormComponent implements OnInit, OnChanges {

  @Input()
  column;
  formGroup = new FormGroup({});
  @Input()
  isDisabled: boolean = false;
  @Output()
  formInstance = new EventEmitter();
  formOperate: FormOperate;


  constructor() {

  }

  ngOnInit(): void {
    this.formOperate = new FormOperate(this.formGroup, this.column);
    this.column.forEach((item: FormItem) => {
      const value = item.initialValue || '';
      const formControl = new FormControl(value, this.formOperate.addRule(item.rule),
        this.formOperate.addAsyncRule(item.asyncRules));
      this.formGroup.addControl(item.key, formControl);
    });
    this.formInstance.emit({instance: this.formOperate});
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  modelChange(controls, $event, col) {
    if (col.modelChange) {
      col.modelChange(controls, $event, col.key, this.formOperate);
    }

  }

  openChange(controls, $event, col) {
    if (col.openChange) {
      col.openChange(controls, $event, col.key, this.column);
    }

  }


}


