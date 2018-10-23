import {Component, OnInit} from '@angular/core';
import {FormItem, FormOperate} from '../../../shared/nw-form';
import {MusicService} from '../../../core/api-service/music.service';
import {Result} from '../../../core/entity/result';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.less']
})
export class MusicDetailComponent implements OnInit {
  column: FormItem[] = [];
  formOperate: FormOperate;
  private songFile: any;

  constructor(private musicService: MusicService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.column = [
      {label: '歌曲名', key: 'songName', rule: [], require: false, type: 'input'},
      {label: '歌手', key: 'singer', rule: [], require: false, type: 'input'},
      {label: '创建时间', key: 'createTime', rule: [], require: false, type: 'input'},
      {label: '歌曲图片', key: 'songPic', rule: [], require: false, type: 'input'},
      {label: '歌曲类型', key: 'songType', rule: [], require: false, type: 'input'},
      {label: '描述', key: 'description', rule: [], require: false, type: 'input'},
    ];

  }

  formInstance(e) {
    this.formOperate = e.instance;
  }

  change(e) {
    this.songFile = e.target.files[0];
    console.log(e);
  }

  save() {
    const _bod: Object = this.formOperate.getData();
    const body = new FormData();
    body.append('file', this.songFile);
    body.append('song', JSON.stringify(_bod));
    this.musicService.save(body).then((re: Result) => {
      this.message.success(re.msg);
    }, err => {
      this.message.error(err.msg);
    });

  }
}
