import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AsyncValidatorFn} from '@angular/forms/src/directives/validators';

/**
 * Created by xiaoconghu on 2018/7/17.
 */
export class FormItem {
  label: string; // label;
  key: string; // 表单字段
  type: string; // 表单类型
  width?: number;  //  表单主体的宽度
  labelWidth?: number;  // 表单label的宽度
  col?: number; // 在一行的占比 一行为24份 不填默认12
  require?: boolean; // 是否有必填星号
  initialValue?: any; // 初始值
  rule: any[];    // 同步校验规则
  asyncRules?: any[]; // 异步校验规则
  selectInfo?: any;  // 选择框（包括单选 多选 下拉选择 ）选项数据
  radioInfo?: any;
  modelChange?: (controls, $event, key, formOperate?) => void;   // 数据变化函数
  openChange?: (controls, $event, key, formOperate?) => void;   // 为下拉框的时候 展开函数
  openContent?: string; // 切换器开的时候显示内容
  closeContent?: string; // 切换器关的时候显示内容

}

export class Rule {

  required?: boolean; // 是否为必填
  minLength?: number;  // 最小长度
  maxLength?: number;  // 最大长度
  min?: number; // 最小值
  max: number; // 最大值
  pattern: RegExp;
  msg?: string;    // 错误信息
  code?: string;  // 响应式表单显示错误代码

}

export interface FormOperateInterface {
  /**
   * 创建列
   */
  createColumn(): void;

  /**
   * 向指定位置新增列
   * param {FormItem} formItem
   * param {number} _index
   */
  addColumn(formItem: FormItem, _index?: number): void;

  /**
   * 删除列
   * param {string} key
   */
  deleteColumn(key: string): void;

  /**
   * 查询配置列中是否有某一列
   * param {string} key
   * returns {{index: string; item?: FormItem}}
   */
  getColumn(key: string): { index: number, item?: FormItem };

  /**
   * 为单个列新增校验规则
   * param {FormItem} formItem
   */
  addValidRule(formItem: FormItem): void;

  /**
   * 删除单个列的校验规则
   * param {FormItem} formItem
   */
  deleteValidRule(formItem: FormItem): void;

  /**
   * 新增 同步 HTML 页面显示 校验规则 和 错误信息
   * param {Rule[]} rule
   * returns {ValidatorFn[]}
   */
  addRule(rule: Rule[]): ValidatorFn[];

  /**
   * 新增异步校验规则
   * param rules
   * returns {AsyncValidatorFn[]}
   */
  addAsyncRule(rules: { asyncRule: AsyncValidatorFn, asyncCode: any }[]): AsyncValidatorFn[];

  /**
   * 删除错误信息
   * param {Rule[]} rule
   */
  deleteRule(rule: Rule[]): void;

  /**
   * 重置所有的列
   * param value
   * param {{onlySelf?: boolean; emitEvent?: boolean}} options
   */
  resetData(value?: any, options?: { onlySelf?: boolean; emitEvent?: boolean; });

  /**
   * 重置单个列
   * param {FormItem} formItem
   * param value
   * param {Object} options 可以将表单状态例如 {valid:true}
   */
  resetControlData(key: string, value?: any, options?: object): void;

  /**
   * 获取数据
   * returns {any}
   */
  getData(key?: string): any;

  /**
   * 获取表单的验证状态
   * param {string} key
   * returns {boolean}
   */
  getValid(key?: string): boolean;


}

export class FormOperate implements FormOperateInterface {

  group: FormGroup;
  column;

  constructor(group, column) {
    this.group = group;
    this.column = column;
  }

  createColumn() {

  }

  addColumn(formItem: FormItem, _index?: number) {
    const index = this.getColumn(formItem.key).index;
    if (index === -1) {
      const validator = this.addRule(formItem.rule);
      const asyncValidator = this.addAsyncRule(formItem.asyncRules);
      const formControl = new FormControl(formItem.initialValue || '', validator, asyncValidator);
      this.group.addControl(formItem.key, formControl);
      if (_index && _index !== 0) {
        this.column.splice(_index, 0, formItem);
      } else {
        this.column.push(formItem);
      }

    } else {

    }

  }

  deleteColumn(key): void {
    const index = this.getColumn(key).index;
    if (index !== -1) {
      this.column.splice(index, 1);
      this.group.removeControl(key);
    } else {

    }

  }

  getColumn(key): { index: number, item?: FormItem } {
    const index = this.column.findIndex(item => item.key === key);
    if (index === -1) {
      return {index: index, item: this.column[index]};

    } else {
      return {index: index};
    }
  }

  addValidRule(formItem: FormItem): void {
    const validator = this.addRule(formItem.rule);
    this.group.controls[formItem.key].setValidators(validator);
  }

  deleteValidRule(formItem: FormItem): void {
    this.group.controls[formItem.key].clearValidators();
    this.deleteRule(formItem.rule);
  }

  addRule(rule: Rule[]): ValidatorFn[] {
    const validator = [];
    if (rule) {
      rule.forEach(item => {
        if (item.hasOwnProperty('required')) {
          validator.push(Validators.required);
          item.msg = item.msg || '此项为必填向！';
          item.code = 'required';
        }
        if (item.hasOwnProperty('minLength')) {
          validator.push(Validators.minLength(item.minLength));
          item.msg = item.msg || `最少输入${item.minLength}位！`;
          item.code = 'minlength';
        }
        if (item.hasOwnProperty('maxLength')) {
          validator.push(Validators.maxLength(item.maxLength));
          item.msg = item.msg || `最多输入${item.maxLength}位！`;
          item.code = 'maxlength';
        }
        if (item.hasOwnProperty('min')) {
          item.code = 'min';
          item.msg = item.msg || `不能小于${item.min}`;
          validator.push(Validators.min(item.min));
        }
        if (item.hasOwnProperty('max')) {
          item.code = 'max';
          item.msg = item.msg || `不能大于${item.max}`;
          validator.push(Validators.max(item.max));
        }
        if (item.hasOwnProperty('email')) {
          item.code = 'email';
          item.msg = item.msg || `邮箱格式有误`;
          validator.push(Validators.email);
        }
        if (item.hasOwnProperty('pattern')) {
          item.code = 'pattern';
          item.msg = item.msg || '正则验证错误';
          validator.push(Validators.pattern(new RegExp(item.pattern)));
        }
      });
    }

    return validator;
  }


  addAsyncRule(rules: { asyncRule: AsyncValidatorFn, asyncCode: any }[]): AsyncValidatorFn[] {
    const control = [];
    if (rules) {
      rules.forEach((rule) => {
        control.push(rule.asyncRule);
      });
    }
    return control;
  }

  deleteRule(rule: Rule[]): void {
    rule = [];
  }

  resetData(value?: any, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
    this.group.reset(value, options);
  }

  resetControlData(key: string, value?: any, options?: object): void {
    this.group.controls[key].reset(value, options);
  }

  getData(key?: string): any {
    if (key) {
      return this.group.controls[key].value;
    } else {
      return this.group.value;
    }
  }

  getValid(key?: string): boolean {
    if (key) {
      return this.group.controls[key].valid;
    } else {
      return this.group.valid;
    }
  }
}


