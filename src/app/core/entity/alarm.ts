/**
 * Created by wh1709040 on 2018/9/17.
 */
export class Alarm {
  private _alarmId: string;
  private _alarmLevel: string;
  private _alarmContent: string;
  private _serverName: string;
  private _serverIp: string;
  private _alarmType: string;
  private _timeStamp?: string | Date;


  get timeStamp(): string | Date {
    return new Date(this._timeStamp);
  }

  set timeStamp(value: string | Date) {
    this._timeStamp = value;
  }

  get alarmType(): string {
    return this._alarmType;
  }

  set alarmType(value: string) {
    this._alarmType = value;
  }

  get alarmId(): string {
    return this._alarmId;
  }

  set alarmId(value: string) {
    this._alarmId = value;
  }

  get alarmLevel(): string {
    return this._alarmLevel;
  }

  set alarmLevel(value: string) {
    this._alarmLevel = value;
  }

  get alarmContent(): string {
    return this._alarmContent;
  }

  set alarmContent(value: string) {
    this._alarmContent = value;
  }

  get serverName(): string {
    return this._serverName;
  }

  set serverName(value: string) {
    this._serverName = value;
  }

  get serverIp(): string {
    return this._serverIp;
  }

  set serverIp(value: string) {
    this._serverIp = value;
  }
}
