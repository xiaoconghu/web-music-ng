import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlarmService} from '../../core/api-service/alarm-service';
import {Alarm} from '../../core/entity/alarm';
import {PageBean} from '../../core/entity/pageBean';
import {TableConfig} from '../../core/entity/tableConfig';
import {SocketIO} from '../../core/utils/websocket.service';
import {Parameter} from '../../core/entity/parameter';
import {CommonUtils} from '../../core/utils/commonUtils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit, OnDestroy {
  dataSet: Alarm[] = [];
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

  constructor(private alarmService: AlarmService,
              private $socket: SocketIO,
              private $router: Router) {
  }

  ngOnInit(): void {
    this.getParameter();
    this.tableConfig = {
      columnConfig: [
        {title: '设备IP', key: 'serverIp', width: '200px'},
        {title: '告警内容', key: 'alarmContent', width: '400px'},
        {title: '告警级别', key: 'alarmLevel', width: '200px'},
        {title: '告警类型', key: 'alarmType', width: '200px'},
        {title: '时间', key: 'timeStamp', width: '200px'},
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
    this.getAlarmList(1, 10, {});
    this.getAlarmListLoop();
    this.getMonitor();
    this._timer = setInterval(e => {
      this.getMonitor();
    }, 5000);
    this.$socket.connect();
    // 告警接收
    this.$socket.openTopic('/wlsTopic/alarm', response => {
      const _temp = JSON.parse(response.body) || [];
      this.alarmInfo.forEach(item => {
        const target = _temp.find(_el => _el.alarmLevel === item.alarmLevel);
        if (target) {
          item.alarmCount = target.alarmCount;
        } else {
        }
      });
    });
    // 邮件接收
    this.$socket.openTopic('/wlsTopic/email', response => {
      const _temp = JSON.parse(response.body);
      this.alarmInfo[this.alarmInfo.length - 1].alarmCount = _temp;
    });
  }

  goToGISMap() {
    this.$router.navigate(['gis-map'], {});
  }

  pageChange(e) {
    window.clearInterval(this.timer);
    this.getAlarmList(e.pageIndex, e.pageSize, {serverIp: this.searchValue}).then(() => {
      this.getAlarmListLoop();
    });

  }

  search() {
    const queryTerm = {serverIp: this.searchValue};
    this.getAlarmList(this.pageBean.pageIndex, this.pageBean.pageSize, queryTerm);
  }

  modelChange(event) {
    console.log(event.target.value);
    this.searchValue = event.target.value;
  }

  getAlarmList(pageNum, pageSize, queryTerm) {
    return new Promise((resolve, reject) => {
      this.alarmService.getAlarmList(pageNum, pageSize, queryTerm).then((result: any) => {
        this.pageBean = new PageBean(result.size, result.pageNum, result.totalCount);
        this.dataSet = result.data;
        this.dataSet.forEach(item => {
          item.alarmType = item.alarmType === '1' ? '湿度告警' : '温度告警';
          item.alarmLevel = item.alarmLevel === '1' ? '紧急' : '一般';
          item.timeStamp = CommonUtils.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(item.timeStamp));
        });
        resolve();
      });
    });
  }

  setting() {
    this.alarmService.updateState(this.parameter).then(result => {
      console.log(result);
    });
  }

  getParameter() {
    this.alarmService.getState().then((result: Parameter) => {
      this.parameter = result;
    });
  }

  getAlarmListLoop() {
    this.timer = window.setInterval(e => {
      this.getAlarmList(this.pageBean.pageIndex, this.pageBean.pageSize
        , {serverIp: this.searchValue});
    }, 5000);
  }

  getMonitor() {
    this.alarmService.getMonitor().then((res: any) => {
      const date = CommonUtils.dateFmt('hh:mm:ss', new Date());
      this.xData.push(date);
      this.yData.produceMsg.push(res.produceMsg);
      this.yData.kafkaMsg.push(res.kafkaMsg);
      this.yData.consumeMsg.push(res.consumeMsg);
      this.changeOption();
      this.dataList = [res];
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

