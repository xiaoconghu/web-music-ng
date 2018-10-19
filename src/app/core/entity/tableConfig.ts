/**
 * Created by wh1709040 on 2018/9/17.
 */
class ColumnConfig {
  public title: string;
  public key: string;
  public width?: string;
}

export class TableConfig {
  public bordered: boolean;
  public showPagination: boolean;
  public columnConfig: ColumnConfig[];
  public operation?: Operation[];
  public topButtons?: Operation[];
}

export class Operation {
  public text: string;
  public handle: any;
}
