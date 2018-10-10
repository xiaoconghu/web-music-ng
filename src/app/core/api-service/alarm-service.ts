/**
 * Created by wh1709040 on 2018/9/17.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AlarmService {
  constructor(private $http: HttpClient) {
  }

  getAlarmList(pageNum, pageSize, queryTerm) {
    return new Promise((resolve, reject) => {
      this.$http.post(`/alarm/alarmList`,
        {pageNum: pageNum, pageSize: pageSize, queryTerm: queryTerm},
      ).subscribe(result => {
        resolve(result);
      });
    });
  }

  updateState(body) {
    return new Promise((resolve, reject) => {
      this.$http.post(`alarm/updateParameter`, body).subscribe(result => {
        resolve(result);
      });
    });
  }
  getState() {
    return new Promise((resolve, reject) => {
      this.$http.get(`alarm/getParameter`).subscribe(result => {
        resolve(result);
      });
    });
  }

  getMonitor() {
    return new Promise((resolve, reject) => {
      this.$http.get(`alarm/getMonitor`).subscribe(result => {
        resolve(result);
      });
    });
  }

  getServerOnGis() {
    return new Promise((resolve, reject) => {
      this.$http.get(`alarm/getServerOnGis`).subscribe(result => {
        resolve(result);
      });
    });
  }
}
