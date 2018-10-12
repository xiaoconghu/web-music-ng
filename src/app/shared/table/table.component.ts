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
  allChecked;
  indeterminate;
  listOfSelection = [
    {
      text    : '选中全部',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text    : '选中偶数行',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 !== 0);
        this.refreshCheckStatus();
      }
    },
    {
      text    : '选中奇数行',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 === 0);
        this.refreshCheckStatus();
      }
    }
  ];
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  refreshCheckStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshCheckStatus();
  }

  refreshStatus(e) {
    this.pageChange.emit(this.pageBean);
  }
}
