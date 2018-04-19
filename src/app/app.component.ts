import { Component, state } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from './services/login.service';
import { OkexwsService } from './services/okexws.service';
import { HuobiwsService } from './services/huobiws.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public title: string;
  private key: string;
  private secret: string;
  public isLogin = false;
  public defaultBuy      = 'trx';
  public defaultCurrency = 'usdt';

  public buyList = ['mith', 'trx', 'okb', 'lrc', 'btm', 'eos', 'hmc'];
  public currencyList = ['usdt', 'btc', 'eth'];
  constructor (private sign: LoginService, private ws: OkexwsService, private hbWs: HuobiwsService) {
   this.title = 'Hello World';
   // tslint:disable-next-line:no-shadowed-variable
   this.sign.check((state: Boolean) => {
      if (state) {
        this.isLogin = true;
        this.signIn();
      } else {
        this.isLogin = false;
      }
   });
  }

  signIn () {
    this.ws.init(() => {
      this.ws.send('ticker', this.defaultBuy + '_' + this.defaultCurrency);
    });
  }

  inputKey (event: any) {
    this.key = event.target.value;
  }

  inputSecret (event: any) {
    this.secret = event.target.value;
  }

  login () {
    // tslint:disable-next-line:no-shadowed-variable
    this.sign.in(this.key, this.secret, (state: Boolean) => {
      let test: any;
      test = state;
      if (test) {
        this.isLogin = true;
        this.signIn();
      } else {
        this.isLogin = false;
      }
    });
  }

  buySelect (event: any) {
    this.ws.removePrevChannel('ticker', this.defaultBuy + '_' + this.defaultCurrency);
    this.defaultBuy = event.target.value;
    this.ws.send('ticker', this.defaultBuy + '_' + this.defaultCurrency);
  }

  currencySelect (event: any) {
    this.ws.removePrevChannel('ticker', this.defaultBuy + '_' + this.defaultCurrency);
    this.defaultCurrency = event.target.value;
    this.ws.send('ticker', this.defaultBuy + '_' + this.defaultCurrency);
  }

  Notification () {
    return new Notification('test', {
      body: 'Hello World'
    });
  }
}
