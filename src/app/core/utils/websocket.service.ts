import {WebsocketService} from './websocket-impl.service';
import {Provider} from '@angular/core';

export class WebSocketFactory {
  /**
   * single instance of SocketIO
   */
  private static instance: SocketIO;

  /**
   * injector single instance
   * param {Provider} type
   * returns {SocketIO}
   */
  static forRoot(type?: Provider) {
    if (!WebSocketFactory.instance) {
      WebSocketFactory.instance =  new WebsocketService();
    }
    return WebSocketFactory.instance;
  }
}

export abstract class SocketIO {
  /**
   * establish single ws connection
   */
  abstract connect();

  /**
   * open one topic and record it in this instance
   * @deprecated use `openTopic` instead
   * param topic
   */
  abstract openTopicOld(topic);

  /**
   * open one topic and record it in this instance
   * param topic
   * param fn
   */
  abstract openTopic(topic, fn);

  /**
   * close some topic by name
   * param topic
   */
  abstract closeTopic(topic);

  /**
   * close single connect
   */
  abstract close();

  /**
   * return the subscribe when topic has establish
   * param fn
   */
  abstract subscribe(fn);

  /**
   * return a promise object of topic
   * param fn
   */
  abstract then(fn);
}

