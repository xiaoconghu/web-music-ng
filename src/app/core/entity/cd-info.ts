/**
 * 歌单实体
 */
export class CdInfo {
  /**
   * id
   */
  private _cdId;
  /**
   * 歌单名称
   */
  private _cdName;

  /**
   * 创建人
   */
  private _createUser;

  /**
   * 创建时间
   */
  private _createTime;

  /**
   * 歌单图片
   */
  private _cdPic;

  /**
   * 描述
   */
  private _description;

  get cdId() {
    return this._cdId;
  }

  set cdId(value) {
    this._cdId = value;
  }

  get cdName() {
    return this._cdName;
  }

  set cdName(value) {
    this._cdName = value;
  }

  get createUser() {
    return this._createUser;
  }

  set createUser(value) {
    this._createUser = value;
  }

  get createTime() {
    return this._createTime;
  }

  set createTime(value) {
    this._createTime = value;
  }

  get cdPic() {
    return this._cdPic;
  }

  set cdPic(value) {
    this._cdPic = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }
}
