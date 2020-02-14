/**
 * Created by wh1709040 on 2018/9/17.
 */
export class ColumnConfig {
  public title: string;
  public key: string;
  public width?: number;
}

export class TableConfig {
  public bordered: boolean;
  public showPagination: boolean;
  public isLoading?: boolean;
  public columnConfig: ColumnConfig[];
  public operation?: Operation[];
  public topButtons?: Operation[];
  public scroll?: any;
  public outHeight?: number;
  public noAutoHeight?: boolean;
}

export class Operation {
  public text: string;
  public handle: any;
}

export enum TableStylePixel {
  PIXEL = 'px',
  TH_TAG_NAME = 'TH'
}
