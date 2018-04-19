import { Injectable } from '@angular/core';
import { ungzip, deflate, inflate } from 'pako';
@Injectable()
export class HuobiwsService {
  private $wssUrlPro = 'wss://api.huobipro.com/ws';
  constructor() {
    let ws: any;
    ws = new WebSocket(this.$wssUrlPro);

    ws.onopen = (e: any) => {
      console.log('success');
      ws.send('{"req": "market.btcusdt.kline.1min","id": "id10"}');
    };

    ws.onmessage = (e: any) => {
      if (e.data instanceof Blob) {
        let dataText: string;
        // dataText = inflate(e.data, {to: 'string'});
        console.log('1', dataText);
        // console.log('Bolb', deflate(e.data));
      }
    };
  }

}
