import * as Stomp from 'stompjs';
import {SocketIO} from './websocket.service';

export class WebsocketService implements SocketIO {
  private socket;
  private stompClient;
  private subscriptions = [];
  private __fn;

  constructor() {
  }

  connect() {
    this.socket = new window['SockJS']('/wls'); // 链接SockJS 的
    this.stompClient = window['Stomp'].over(this.socket);
    // this.stompClient.debug = null;
    this.stompClient.heartbeat.outgoing = 1000;
    this.stompClient.heartbeat.incoming = 1000;
    if (!this.stompClient.connected) {
      this.stompClient.connect({}, frame => frame);
    }
  }

  openTopicOld(topic) {
    return new Promise((resolve, reject) => {
      this._open(topic, resolve, reject);
    });
  }

  openTopic(topic, fn = null) {
    this.$open(topic, fn, 0);
    return this;
  }

  closeTopic(topic) {
    try {
      const _index = this.subscriptions.findIndex(item => item.topic === topic);
      if (_index !== -1) {
        this.subscriptions.splice(_index, 1)[0].subscription.unsubscribe();
      }
    } catch (err) {
    }
  }

  subscribe(fn) {
    if (typeof fn === 'function') {
      this.__fn = fn;
    }
  }

  then(fn) {
    if (typeof fn === 'function') {
      this.__fn = fn;
    }
  }

  close() {
    if (this.stompClient.connected) {
      this.stompClient.disconnect();
    }
  }

  private _open(topic, resolve, reject, num: number = 0) {
    if (num >= 15) {
      return;
    }
    if (this.stompClient && this.stompClient.connected) {
      const subscription = this.stompClient.subscribe(topic, success => {
        if (this.__fn) {
          this.__fn(success['body']);
        }
        resolve(success);
      }, failed => reject(failed));
      this.subscriptions.push({topic, subscription});
    } else {
      setTimeout(() => {
        this._open(topic, resolve, reject, ++num);
      }, 1000);
    }
  }

  private $open(topic, fn, num: number = 0) {
    if (num >= 15) {
      return;
    }
    if (this.stompClient && this.stompClient.connected) {
      let subscription;
      if (fn) {
        subscription = this.stompClient.subscribe(topic, fn);
      }
      this.subscriptions.push({topic, subscription});
    } else {
      setTimeout(() => {
        this.$open(topic, fn, num + 1);
      }, 1000);
    }
  }

}
