import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PageBean} from '../../core/entity/pageBean';
import {TableConfig} from '../../core/entity/tableConfig';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  dataSet = [];
  @Input()
  pageBean: PageBean;
  @Input()
  tableConfig: TableConfig;
  @Output()
  pageChange = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  refreshStatus(e) {
    this.pageChange.emit(this.pageBean);
  }
}
