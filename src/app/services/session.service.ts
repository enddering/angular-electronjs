import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  constructor() { }
  get (key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  set (key, value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  del (key) {
    if (undefined === key) {
      return window.sessionStorage.clear();
    } else {
      return window.sessionStorage.removeItem(key);
    }
  }
}
