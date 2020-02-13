import {Component, OnInit} from '@angular/core';
import {Result} from '../../../core/entity/result';
import {FormItem, FormOperate} from '../../../shared/nw-form';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {SingerService} from '../../../core/api-service/singer.service';

@Component({
  selector: 'nw-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit {

  column: FormItem[] = [];
  formOperate: FormOperate;
  type;
  id;
  private songFile: any;

  constructor(private singerService: SingerService,
              private $router: Router,
              private activeRoute: ActivatedRoute,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.type = this.activeRoute.snapshot.params.type;
    if (this.type === 'update') {
      this.activeRoute.queryParams.subscribe(e => {
        this.id = e.id;
        this.singerService.getUserById(e.id).then((result: Result) => {
          console.log(result.data);
          this.formOperate.resetData(result.data);
        });
      });
    }
    this.column = [
      {label: '名称', key: 'singerName', rule: [{required: true}, {minLength: 3}], require: true, type: 'input'},
      {label: '雅称', key: 'singerNickName', rule: [], require: true, type: 'input'},
      {label: '创建时间', key: 'createTime', rule: [], require: true, type: 'input'},
      {label: '头像', key: 'singerPic', rule: [], require: true, type: 'input'},
      {
        label: '性别', key: 'singerGender', rule: [], require: true, type: 'select',
        selectInfo: {
          data: [{label: '男', value: 1}, {label: '女', value: 2}],
        }
      },
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
    console.log(this.type);
    if (this.type === 'update') {
      const body = this.formOperate.getData();
      body.id = this.id;
      this.singerService.update(body).then((res: Result) => {
        this.$router.navigate(['/user/music/singer-list']);
      });
    } else {
      const _bod: Object = this.formOperate.getData();
      this.singerService.save(_bod).then((re: Result) => {
        this.$router.navigate(['/user/music/singer-list']);
        this.message.success(re.msg);
      }, err => {
        this.message.error(err.msg);
      });
    }


  }

  goBack() {
    history.go(-1);
  }

}
