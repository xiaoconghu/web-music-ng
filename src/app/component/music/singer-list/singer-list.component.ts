import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageBean} from '../../../core/entity/pageBean';
import {TableConfig} from '../../../core/entity/tableConfig';
import {Result} from '../../../core/entity/result';
import {NzMessageService} from 'ng-zorro-antd';
import {MusicMissionService} from '../../../core/mission/music-mission.service';
import {Singer} from '../../../core/entity/singer';
import {SingerService} from '../../../core/api-service/singer.service';

@Component({
  selector: 'nw-singer-list',
  templateUrl: './singer-list.component.html',
  styleUrls: ['./singer-list.component.less']
})
export class SingerListComponent implements OnInit {
  dataSet: Singer[] = [];
  tableConfig: TableConfig;
  pageBean: PageBean = new PageBean(10, 1, 1);

  constructor(private $router: Router,
              private singerService: SingerService,
              private message: NzMessageService,
              private mission: MusicMissionService) {
  }


  ngOnInit() {
    this.tableConfig = {
      bordered: false,
      showPagination: false,
      columnConfig: [
        {title: '名称', key: 'singerName'},
        {title: '雅称', key: 'singerNickName'},
        {title: '上传时间', key: 'createTime'},
        {title: '头像', key: 'singerPic'},
        {title: '性别', key: 'singerGender'},
        {title: '描述', key: 'description'},
        {title: '操作', key: '', width: '200px'},
      ],
      operation: [
        {
          text: '删除',
          handle: (currentIndex) => {
            console.log(currentIndex);
            this.deleteMusic(currentIndex.id);
          }
        },
        {
          text: '修改',
          handle: (currentIndex) => {
            this.$router.navigate(['/user/music/singer-detail/update'], {queryParams: {id: currentIndex.id}}).then(e => {
            });
          }
        }
      ],
      topButtons: [
        {
          text: '新增歌手',
          handle: (currentIndex) => {
            this.$router.navigate(['/user/music/singer-detail/add']).then(e => {
            });
          }
        },
        {
          text: '批量删除',
          handle: (currentIndex) => {
            const ids = currentIndex.map(item => item.id);
            console.log(ids);
            this.deleteByBatch(ids);
          }
        },
      ]
    };
    this.getMusicList();
  }

  public getMusicList() {
    this.singerService.getMusicList().then((re: Result) => {
      this.dataSet = re.data;
    }, err => {
      this.message.error(err.msg);
    });
  }

  deleteMusic(id) {
    this.singerService.deleteMusicById(id).then((result: Result) => {
      this.message.success(result.msg);
      this.getMusicList();
    }, err => {
      this.message.error(err.msg);
    });
  }

  deleteByBatch(ids) {
    this.singerService.deleteByBatch(ids).then((result: Result) => {
      this.getMusicList();
    });
  }

  private playMusic(currentMusic) {
    this.mission.commitMusic(currentMusic);
  }
}
