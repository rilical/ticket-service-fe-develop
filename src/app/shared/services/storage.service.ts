import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';
import {IStorage} from '../../Istorage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    // find out if storage needs to be forcefully nulled
    this._setResetKey();
  }

  private get ourStorage(): Storage {
    return localStorage;
  }

  /*private _setResetKey(): void {

    // wait for config to be loaded first
     this.configService.config$.pipe(
         first(config => config.isServed),
     ).subscribe(config => {
       // even with error, resume as above

       // ...
   }
   */

  // ...

  clear(): void {
    // remove all prefixed items
    const toClear = [];

    for (let i = 0; i < this.ourStorage.length; i++) {
      const name = this.ourStorage.key(i);
      if (name?.indexOf(environment.Config.Storage.Key) === 0) {
        // delay because removeItem is destructive
        toClear.push(name);
      }
    }

    toClear.forEach((n) => this.ourStorage.removeItem(n));
  }

  removeItem(key: string, withLanguage = false) {
    // setup the key
    const _key = `${environment.Config.Storage.Key}${withLanguage ? '.' + environment.Config.Basic.language : ''}.${key}`;

    this.ourStorage.removeItem(_key);
  }

  // for caching language specific, prefix with language
  setItem(key: string, value: any, expiresin: number = environment.Config.Storage.Timeout, withLanguage = true) {
    // prepare value
    const _value: IStorage = {
      value,
      timestamp: Date.now(), // in milliseconds
      expiresin: expiresin, // in hours
    };

    // objects must be strings
    this.ourStorage.setItem(
      this.getKey(key, withLanguage),
      JSON.stringify(_value)
    );
  }

  getItem(key: string, withLanguage = false): any {
    // check value
    const _key = this.getKey(key, withLanguage);
    const value: any = this.ourStorage.getItem(_key);

    if (!value) {
      return null;
    }
    // cast
    const _value: IStorage = JSON.parse(value);

    // calculate expiration, expiresin is in hours, so convert to milliseconds
    if (Date.now() - _value.timestamp > _value.expiresin * 3_600_000) {
      // if expired, remove
      this.ourStorage.removeItem(_key);
      return null;
    }
    // return the value
    return _value.value;
  }

  setCache(key: string, value: any, expiresIn: number = environment.Config.Storage.Timeout) {
    this.setItem(key, value, expiresIn, true);
  }

  getCache(key: string): any {
    return this.getItem(key, true);
  }

  removeCache(key: string) {
    this.removeItem(key, true);
  }

  setUserToken(token: string) {
    try {
      localStorage.setItem('token', token);
    } catch (e) {
      console.log(e)
    }
  }

  getUserToken(): string {
    let tokenFromStorage: string | null = localStorage.getItem('token');
    try {
      if (tokenFromStorage)
        return tokenFromStorage
      else
        return "";
    } catch (e) {
      return "";
    }
  }

  getItemByJustKey(key: string): any {
    // check value
    const value: any = this.ourStorage.getItem(key);
    if (!value) {
      return null;
    }
    /*
      // calculate expiration, expiresin is in hours, so convert to milliseconds
      if (Date.now() - _value.timestamp > _value.expiresin * 3_600_000) {
        // if expired, remove
        this.ourStorage.removeItem(key);
        return null;
      }
      */
    // return the value
    return JSON.parse(value);
  }

  private _setResetKey(): void {
    const _key = this.getKey(environment.Config.Storage.ResetKey);
    const _reset: any = this.ourStorage.getItem(_key);

    // if it does not exist, it must have changed in config, remove everything
    if (!_reset || _reset !== 'true') {
      this.clear();
      // set a new one
      this.ourStorage.setItem(_key, 'true');
    }
  }

  private getKey(key: string, withLanguage = false): string {
    // one function to take care of key
    return `${environment.Config.Storage.Key}${withLanguage ? '.' + environment.Config.Basic.language : ''}.${key}`;
  }
}
