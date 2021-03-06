import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageBean} from '../../../core/entity/pageBean';
import {TableConfig} from '../../../core/entity/tableConfig';
import {Music} from '../../../core/entity/music';
import {MusicService} from '../../../core/api-service/music.service';
import {Result} from '../../../core/entity/result';
import {NzMessageService} from 'ng-zorro-antd';
import {MusicMissionService} from '../../../core/mission/music-mission.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.less']
})
export class MusicListComponent implements OnInit {
  dataSet: Music[] = [];
  tableConfig: TableConfig;
  pageBean: PageBean = new PageBean(10, 1, 1);

  constructor(private $router: Router,
              private musicService: MusicService,
              private message: NzMessageService,
              private mission: MusicMissionService) {
  }


  ngOnInit() {
    this.tableConfig = {
      bordered: false,
      showPagination: false,
      columnConfig: [
        {title: '歌曲名', key: 'songName', width: 150},
        {title: '歌单', key: 'cdName'},
        {title: '歌手', key: 'singerName'},
        {title: '上传时间', key: 'createTime'},
        {title: '图片', key: 'songPic'},
        {title: '歌曲类型', key: 'songType'},
        {title: '描述', key: 'description'},
        {title: '操作', key: '', width: 130},
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
          text: '播放',
          handle: (currentIndex) => {
            console.log(currentIndex);
            this.playMusic(currentIndex);
          }
        },
        {
          text: '修改',
          handle: (currentIndex) => {
            console.log(currentIndex);
            this.$router.navigate(['/user/music/music-detail/update'], {queryParams: {id: currentIndex.id}}).then(e => {
            });
          }
        }
      ],
      topButtons: [
        {
          text: '上传音乐',
          handle: (currentIndex) => {
            this.$router.navigate(['/user/music/music-detail/add']).then(e => {
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
    this.musicService.getMusicList().then((re: Result) => {
      this.tableConfig.isLoading = false;
      this.mission.commitMusicList(re.data);
      this.dataSet = re.data;
    }, err => {
      this.message.error(err.msg);
      this.tableConfig.isLoading = false;
    });
  }

  deleteMusic(id) {
    this.musicService.deleteMusicById(id).then((result: Result) => {
      if (result.code === 0) {
        this.message.success(result.msg);
        this.getMusicList();
      } else {
        this.message.error(result.msg);
      }
    }, err => {
      this.message.error(err.msg);
    });
  }

  deleteByBatch(ids) {
    this.musicService.deleteByBatch(ids).then((result: Result) => {
      if (result.code === 0) {
        this.message.success(result.msg);
        this.getMusicList();
      } else {
        this.message.error(result.msg);
      }
    }, (error) => {
      this.message.error(error.msg);
    });
  }

  pageChange(event) {

  }

  private playMusic(currentMusic) {
    this.mission.commitMusic(currentMusic);
  }
}
