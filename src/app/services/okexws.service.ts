import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class OkexwsService {
  private wssUrl = 'wss://real.okex.com:10441/websocket';
  public socket: any;
  public overTime = 8000;
  public tickerData: any;
  public depthData: any;
  public depthsData: any;
  public dealsData: any;
  public klineData: any;
  public orderData: any;
  public balanceData: any;

  private channel = {
    ticker  : 'ok_sub_spot_X_ticker',
    depth   : 'ok_sub_spot_X_depth',
    depths  : 'ok_sub_spot_X_depth_Y',
    deals   : 'ok_sub_spot_X_deals',
    kline   : 'ok_sub_spot_X_kline_Y',
    order   : 'ok_sub_spot_X_order',
    balance : 'ok_sub_spot_X_balance'
  };

  constructor() {
  }

  init (callback) {
    this.socket = new WebSocket(this.wssUrl);
    this.socket.onopen = (e: any) => {
      return callback();
    };

    this.socket.onmessage = (e: any) => {
      let data: any;
      data = JSON.parse(e.data);

      if (data.event === 'pong') {
        console.log('pong');
        return true;
      } else {
        data = data[0];
      }
      let tag = data.channel.split('_').pop();

      if (data.channel.indexOf('depth_') > -1) {
        tag = 'depths';
      }

      if (data.channel.indexOf('kline_') > -1) {
        tag = 'kline';
      }

      switch (tag) {
        case 'ticker':
          this.tickerData = data.data;
        break;
        case 'depth':
          this.depthData = data.data;
        break;
        case 'deals':
          this.dealsData = data.data;
        break;
        case 'kline':
          this.klineData = data.data;
        break;
        case 'order':
          this.orderData = data.data;
        break;
        case 'balance':
          this.balanceData = data.data;
        break;
      }
    };

    setInterval(() => {
      this.socket.send('{"event": "ping"}');
    }, 5000);
  }

  send (tag, x, y = null, sign = null) {
    let channel: any;
    channel = this.getChannel(tag, x, y);

    let signParamters: any;
    signParamters = {
      api_key: '',
      secret: Md5.hashStr('')
    };

    let parameters: any;
    parameters = {event: 'addChannel', channel: channel, parameters: signParamters};
    if (sign) {
      signParamters.api_key = sign.key;
      signParamters.secret  = Md5.hashStr('api_key=' + sign.key + '&secret_key=' + sign.secret);
    } else {
      delete parameters.parameters;
    }

    this.socket.send(JSON.stringify(parameters));
  }

  removePrevChannel (tag: any, x, y = null) {
    let channel: string;
    channel = this.getChannel(tag, x, y);

    this.socket.send('{"event":"removeChannel","channel":"' + channel + '"}');
  }

  private getChannel(tag, x, y = null): string {
    let channel = '';
    if (!y) {
      channel = this.channel[tag].replace('X', x);
    } else {
      channel = this.channel[tag].replace(/([X])(.*?)([Y])/, x + '_' + tag + '_' + y);
    }

    return channel;
  }

  ping () {

  }
}
