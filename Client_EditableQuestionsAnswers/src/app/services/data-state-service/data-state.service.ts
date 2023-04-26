import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';

export const QUESTION_TYPE_LIST = makeStateKey('question-type-list');
export const QUESTION_ANSWER_LIST = makeStateKey('question-answer-list');

@Injectable({
  providedIn: 'root'
})
export class DataStateService {
  isServer = false;

  constructor(
    private tstate: TransferState,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isServer = isPlatformServer(platformId);
  }

  checkAndGetData(key: StateKey<string>, getDataObservable: Observable<any>, defaultValue: any = []) {
    if (this.tstate.hasKey(key)) {
      return Observable.of(this.tstate.get(key, defaultValue));
    } else {
      return getDataObservable.pipe(
        tap((data) => {
          if (this.isServer) {
            this.tstate.set(key, data);
          }
        })
      );
    }
  }

  removeStateKey(key: StateKey<string>) {
    this.tstate.remove(key);
  }

  getDynamicStateKey(key: string) {
    return makeStateKey(key);
  }

}
