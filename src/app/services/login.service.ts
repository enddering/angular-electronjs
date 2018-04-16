import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
@Injectable()
export class LoginService {
  private sid = 'jc-sid';
  public sign: any;

  constructor(private sess: SessionService) {

  }

  check (caallback) {
    if (!this.sess.get(this.sid)) {
      return caallback(false);
    } else {
      this.sign = this.sess.get(this.sid);
      return caallback(true);
    }
  }

  in (key, secret, callback) {

    this.sess.set(this.sid, {
      key: key,
      secret: secret
    });

    return this.check(callback);
  }

  out (callback) {
    this.sess.del(this.sid);
    return this.check(callback);
  }
}
