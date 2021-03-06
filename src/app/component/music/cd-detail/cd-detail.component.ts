import {Component, OnInit} from '@angular/core';
import {FormItem, FormOperate} from '../../../shared/nw-form';
import {Result} from '../../../core/entity/result';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {CdInfoService} from '../../../core/api-service/cd-info.service';
import {SingerService} from '../../../core/api-service/singer.service';

@Component({
  selector: 'nw-cd-detail',
  templateUrl: './cd-detail.component.html',
  styleUrls: ['./cd-detail.component.less']
})
export class CdDetailComponent implements OnInit {

  column: FormItem[] = [];
  formOperate: FormOperate;
  type;
  id;
  private songFile: any;

  constructor(private cdInfoService: CdInfoService,
              private singerService: SingerService,
              private $router: Router,
              private activeRoute: ActivatedRoute,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.type = this.activeRoute.snapshot.params.type;
    if (this.type === 'update') {
      this.activeRoute.queryParams.subscribe(e => {
        this.id = e.id;
        this.cdInfoService.getUserById(e.id).then((result: Result) => {
          console.log(result.data);
          this.formOperate.resetData(result.data);
        });
      });
    }
    this.getSingerList().then((result: Result) => {
      this.initColumn(result.data);
    });
  }

  formInstance(e) {
    this.formOperate = e.instance;
  }

  change(e) {
    this.songFile = e.target.files[0];
    console.log(e);
  }

  save() {
    if (!this.formOperate.updateValueAndValidity()) {
      return;
    }
    if (this.type === 'update') {
      const body = this.formOperate.getData();
      body.id = this.id;
      this.cdInfoService.update(body).then((res: Result) => {
        this.$router.navigate(['/user/music/cd-list']);
      });
    } else {
      const _bod: Object = this.formOperate.getData();
      this.cdInfoService.save(_bod).then((re: Result) => {
        this.$router.navigate(['/user/music/cd-list']);
        this.message.success(re.msg);
      }, err => {
        this.message.error(err.msg);
      });
    }


  }

  public getSingerList() {
    return this.singerService.getMusicList();
  }

  goBack() {
    history.go(-1);
  }

  private initColumn(data) {
    this.column = [
      {label: '歌单名称', key: 'cdName', rule: [{required: true}, {minLength: 3}], require: true, type: 'input'},
      {label: '歌单图片', key: 'cdPic', rule: [], type: 'input'},
      {
        label: '所属歌手', key: 'singerId', rule: [], allowClear: true, type: 'select',
        selectInfo: {
          data: data,
          label: 'singerName',
          value: 'id'
        }
      },
      {label: '上传时间', key: 'createTime', rule: [],  type: 'input'},
      {label: '描述', key: 'description', rule: [],  type: 'textarea'},
    ];

  }

}
