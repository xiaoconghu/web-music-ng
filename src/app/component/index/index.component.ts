import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageBean} from '../../core/entity/pageBean';
import {TableConfig} from '../../core/entity/tableConfig';
import {SocketIO} from '../../core/utils/websocket.service';
import {Parameter} from '../../core/entity/parameter';
import {CommonUtils} from '../../core/utils/commonUtils';
import {Router} from '@angular/router';
import {User} from '../../core/entity/user';
import {UserService} from '../../core/api-service/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit, OnDestroy {
  dataSet: User[] = [];
  pageBean: PageBean = new PageBean(10, 1, 1);
  tableConfig: TableConfig;
  tableListConfig: TableConfig;
  alarmInfo = [
    {alarmLevel: '1', alarmCount: 0},
    {alarmLevel: '2', alarmCount: 0},
    {alarmLevel: '3', alarmCount: 0},
  ];
  searchValue = '';
  dataList: any[] = [];
  parameter: Parameter = new Parameter();
  timer;
  _timer;
  xData = [];
  yData = {produceMsg: [], kafkaMsg: [], consumeMsg: []};
  chartOption = {};
  chartOption1 = {};
  chartOption2 = {};
  chartOption3 = {};

  constructor(private userService: UserService,
              private $socket: SocketIO,
              private $router: Router) {
  }

  ngOnInit(): void {
    this.tableConfig = {
      columnConfig: [
        {title: '用户昵称', key: 'userName', width: '200px'},
        {title: '用户代码', key: 'userCode', width: '200px'},
        {title: '手机号', key: 'phoneNumber', width: '200px'},
        {title: '用户邮箱', key: 'email', width: '200px'},
        {title: '创建时间', key: 'createTime', width: '200px'},
      ],
      showPagination: true,
      bordered: false
    };
    this.tableListConfig = {
      columnConfig: [
        {title: '产生数据量', key: 'produceMsg', width: '200px'},
        {title: '队列数据量', key: 'kafkaMsg', width: '200px'},
        {title: '消费数据量', key: 'consumeMsg', width: '200px'},
      ],
      showPagination: false,
      bordered: true
    };
    this.getUserList();
  }

  pageChange(e) {
  }

  modelChange(event) {
    console.log(event.target.value);
    this.searchValue = event.target.value;
  }

  addUser() {
    this.$router.navigate(['/user/add-user']).then(e => {
    });
  }

  getUserList() {
    this.userService.getAllUser().then((result: any) => {
      console.log(result);
      this.dataSet = result.data;
    });
  }

  changeOption() {
    this.chartOption = {
      title: {
        text: 'kafka数据分析'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        data: ['产生数据量', '队列数据量', '消费数据量']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          splitLine: {show: false},
          boundaryGap: false,
          data: this.xData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '产生数据量',
          type: 'line',
          color: '#ff4f39',
          smooth: true,
          data: this.yData.produceMsg
        },
        {
          name: '队列数据量',
          type: 'line',
          color: '#4aff29',
          smooth: true,
          data: this.yData.kafkaMsg
        },
        {
          name: '消费数据量',
          type: 'line',
          color: '#505ae9',
          smooth: true,
          data: this.yData.consumeMsg
        }
      ]
    };
    this.chartOption1 = {
      title: {
        text: '产生数据量'
      },
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   data: ['产生数据量']
      // },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          splitLine: {show: false},
          boundaryGap: false,
          data: this.xData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '产生数据量',
          type: 'line',
          color: '#ff4f39',
          smooth: true,
          data: this.yData.produceMsg
        }
      ]
    };
    this.chartOption2 = {
      title: {
        text: '队列数据量'
      },
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   data: ['队列数据量']
      // },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          splitLine: {show: false},
          boundaryGap: false,
          data: this.xData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '队列数据量',
          type: 'line',
          color: '#4aff29',
          smooth: true,
          data: this.yData.kafkaMsg
        }
      ]
    };
    this.chartOption3 = {
      title: {
        text: '消费数据量'
      },
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   data: ['消费数据量']
      // },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          splitLine: {show: false},
          boundaryGap: false,
          data: this.xData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '消费数据量',
          type: 'line',
          color: '#505ae9',
          smooth: true,
          data: this.yData.consumeMsg
        }
      ]
    };
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
    if (this._timer) {
      window.clearInterval(this._timer);
    }
  }
}

