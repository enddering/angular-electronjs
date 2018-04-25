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
  public defaultBuy      = 'int';
  public defaultCurrency = 'usdt';

  public buyList = ['mith', 'snt', 'int', 'btm', 'gtc', 'trx', 'okb', 'lrc', 'btm', 'eos', 'hmc'];
  public currencyList = ['usdt', 'btc', 'eth'];
  constructor (private sign: LoginService, public ws: OkexwsService) {
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
    this.initSocket();
  }

  initSocket () {
    this.ws.init(() => {
      this.ws.send('ticker', this.defaultBuy + '_' + this.defaultCurrency);
      this.ws.send('depths', this.defaultBuy + '_' + this.defaultCurrency, 20);
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
      if (state) {
        this.isLogin = true;
        this.signIn();
      } else {
        this.isLogin = false;
      }
    });
  }

  buySelect (event: any) {
    this.defaultBuy = event.target.value;
    this.ws.close();
    this.initSocket();
  }

  currencySelect (event: any) {
    this.defaultCurrency = event.target.value;
    this.ws.close();
    this.initSocket();
  }

  Notification () {
    return new Notification('test', {
      body: 'Hello World'
    });
  }
}
