/**
 * 歌手实体类
 */
export class Singer {
  /**
   * 歌手名称
   */
  private _singerName;
  /**
   * 歌手昵称
   */
  private _singerNickName;
  /**
   * 创建时间
   */
  private _createTime;
  /**
   * 歌手头像
   */
  private _singerPic;
  /**
   * 性别
   */
  private _singerGender;
  /**
   * 描述
   */
  private _description;

  get singerName() {
    return this._singerName;
  }

  set singerName(value) {
    this._singerName = value;
  }

  get singerNickName() {
    return this._singerNickName;
  }

  set singerNickName(value) {
    this._singerNickName = value;
  }

  get createTime() {
    return this._createTime;
  }

  set createTime(value) {
    this._createTime = value;
  }

  get singerPic() {
    return this._singerPic;
  }

  set singerPic(value) {
    this._singerPic = value;
  }

  get singerGender() {
    return this._singerGender;
  }

  set singerGender(value) {
    this._singerGender = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }
}
