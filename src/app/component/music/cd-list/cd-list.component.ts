import {Component, OnInit} from '@angular/core';
import {TableConfig} from '../../../core/entity/tableConfig';
import {PageBean} from '../../../core/entity/pageBean';
import {MusicService} from '../../../core/api-service/music.service';
import {MusicMissionService} from '../../../core/mission/music-mission.service';
import {Result} from '../../../core/entity/result';
import {CdInfo} from '../../../core/entity/cd-info';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {CdInfoService} from '../../../core/api-service/cd-info.service';

@Component({
  selector: 'nw-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.less']
})
export class CdListComponent implements OnInit {
  dataSet: CdInfo[] = [];
  tableConfig: TableConfig;
  pageBean: PageBean = new PageBean(10, 1, 1);

  constructor(private $router: Router,
              private cdInfoService: CdInfoService,
              private message: NzMessageService,
              private mission: MusicMissionService) {
  }


  ngOnInit() {
    this.tableConfig = {
      bordered: false,
      showPagination: false,
      columnConfig: [
        {title: '歌单名称', key: 'cdName'},
        {title: '所属歌手', key: 'singerName'},
        {title: '上传时间', key: 'createTime'},
        {title: '歌单图片', key: 'singerPic'},
        {title: '描述', key: 'description'},
        {title: '操作', key: ''},
      ],
      operation: [
        {
          text: '删除',
          handle: (currentIndex) => {
            console.log(currentIndex);
            this.deleteMusic(currentIndex.cdId);
          }
        },
        {
          text: '修改',
          handle: (currentIndex) => {
            this.$router.navigate(['/user/music/cd-detail/update'], {queryParams: {id: currentIndex.id}}).then(e => {
            });
          }
        }
      ],
      topButtons: [
        {
          text: '新增歌单',
          handle: (currentIndex) => {
            this.$router.navigate(['/user/music/cd-detail/add']).then(e => {
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
    this.tableConfig.isLoading = true;
    this.cdInfoService.getMusicList().then((re: Result) => {
      this.tableConfig.isLoading = false;
      this.dataSet = re.data;
    }, err => {
      this.tableConfig.isLoading = false;
      this.message.error(err.msg);
    });
  }

  deleteMusic(id) {
    this.cdInfoService.deleteMusicById(id).then((result: Result) => {
      this.message.success(result.msg);
      this.getMusicList();
    }, err => {
      this.message.error(err.msg);
    });
  }

  deleteByBatch(ids) {
    this.cdInfoService.deleteByBatch(ids).then((result: Result) => {
      this.getMusicList();
    });
  }

  pageChange(event) {

  }

  private playMusic(currentMusic) {
    this.mission.commitMusic(currentMusic);
  }
}
