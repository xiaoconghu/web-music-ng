/**
 * Created by wh1709040 on 2018/10/23.
 */
export class Music {
  /**
   * id
   */
  private _id: number;

  /**
   * 歌曲名称
   */
  private _songName: string;

  /**
   * url
   */
  private _songUrl: string;

  /**
   * 歌手
   */
  private _singer: string;

  /**
   * 创建时间
   */
  private _createTime: string;

  /**
   * 歌曲封面
   */
  private _songPic: string;

  /**
   * 歌曲类型
   */
  private _songType: string;

  /**
   * 所属 cd
   */
  private _cdId: number;

  /**
   * file
   */
  private _file: string;

  /**
   * 描述
   */

  private _description: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get songName(): string {
    return this._songName;
  }

  set songName(value: string) {
    this._songName = value;
  }

  get songUrl(): string {
    return this._songUrl;
  }

  set songUrl(value: string) {
    this._songUrl = value;
  }

  get singer(): string {
    return this._singer;
  }

  set singer(value: string) {
    this._singer = value;
  }

  get createTime(): string {
    return this._createTime;
  }

  set createTime(value: string) {
    this._createTime = value;
  }

  get songPic(): string {
    return this._songPic;
  }

  set songPic(value: string) {
    this._songPic = value;
  }

  get songType(): string {
    return this._songType;
  }

  set songType(value: string) {
    this._songType = value;
  }

  get cdId(): number {
    return this._cdId;
  }

  set cdId(value: number) {
    this._cdId = value;
  }

  get file(): string {
    return this._file;
  }

  set file(value: string) {
    this._file = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

}
