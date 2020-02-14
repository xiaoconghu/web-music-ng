import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PageBean} from '../../core/entity/pageBean';
import {ColumnConfig, Operation, TableConfig, TableStylePixel} from '../../core/entity/tableConfig';
import {CommonUtils} from '../../core/utils/commonUtils';

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
  allChecked = false;
  indeterminate = false;
  listOfSelection = [
    {
      text: '选中全部',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: '选中偶数行',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 !== 0);
        this.refreshCheckStatus();
      }
    },
    {
      text: '选中奇数行',
      onSelect: () => {
        this.dataSet.forEach((data, index) => data.checked = index % 2 === 0);
        this.refreshCheckStatus();
      }
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.calcTableWidth();
    this.calcTableHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.indeterminate = false;
      this.allChecked = false;
    }
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

  handle(operation: Operation, index, data) {
    this.tableConfig.operation[index].handle(data);
  }

  topHandle(operation: Operation, index) {
    const data = this.dataSet.filter(item => item.checked === true);
    this.tableConfig.topButtons[index].handle(data);
  }

  /**
   * 计算表格宽度
   */
  calcTableWidth() {
    let tableWidth = 0;
    this.tableConfig.columnConfig.forEach((item: ColumnConfig) => {
      // 如果有一列没设置宽 为了防止这一列在操作之后不显示
      if (!item.width) {
        item.width = 100;
      }
      if (item.width && !item['hidden']) {
        tableWidth += item.width;
      }
    });
    const x = tableWidth + TableStylePixel.PIXEL;
    const y = 50 + TableStylePixel.PIXEL;
    this.tableConfig.scroll = {x, y};
  }

  /**
   * 计算表格高度
   */
  calcTableHeight() {
    // 表格高度自动适配 340 为基础表格的外高度 如果表格上有其他高的控制占高度需要传入outHeight
    const outHeight = this.tableConfig.outHeight || 0;
    if (this.tableConfig.scroll && (!this.tableConfig.noAutoHeight)) {
      this.tableConfig.scroll.y = CommonUtils.getClientHeight() - 340 - outHeight + TableStylePixel.PIXEL;
      this.tableConfig.scroll = {x: this.tableConfig.scroll.x, y: this.tableConfig.scroll.y};
    }
  }
}
