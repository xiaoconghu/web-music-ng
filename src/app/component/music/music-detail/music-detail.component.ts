import {Component, OnInit} from '@angular/core';
import {FormItem, FormOperate} from '../../../shared/nw-form';
import {MusicService} from '../../../core/api-service/music.service';
import {Result} from '../../../core/entity/result';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.less']
})
export class MusicDetailComponent implements OnInit {
  column: FormItem[] = [];
  formOperate: FormOperate;
  private songFile: any;
  type;
  id;
  constructor(private musicService: MusicService,
              private $router: Router,
              private activeRoute: ActivatedRoute,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.type = this.activeRoute.snapshot.params.type;
    if (this.type === 'update') {
      this.activeRoute.queryParams.subscribe(e => {
        this.id = e.id;
        this.musicService.getUserById(e.id).then((result: Result) => {
          console.log(result.data);
          this.formOperate.resetData(result.data);
        });
      });
    }
    this.column = [
      {label: '歌曲名', key: 'songName', rule: [{required: true}, {minLength: 3}], require: true, type: 'input'},
      {label: '歌手', key: 'singer', rule: [], require: true, type: 'input'},
      {label: '创建时间', key: 'createTime', rule: [], require: true, type: 'input'},
      {label: '歌曲图片', key: 'songPic', rule: [], require: true, type: 'input'},
      {label: '歌曲类型', key: 'songType', rule: [], require: true, type: 'input'},
      {label: '描述', key: 'description', rule: [], require: true, type: 'input'},
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
    if (this.type === 'update') {
      const body = this.formOperate.getData();
      body.id = this.id;
      this.musicService.update(body).then((res: Result) => {
        this.$router.navigate(['/user/music/music-list']);
      });
    } else {
      const _bod: Object = this.formOperate.getData();
      const body = new FormData();
      body.append('file', this.songFile);
      body.append('song', JSON.stringify(_bod));
      this.musicService.save(body).then((re: Result) => {
        this.$router.navigate(['/user/music/music-list']);
        this.message.success(re.msg);
      }, err => {
        this.message.error(err.msg);
      });
    }


  }
}
