import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  protected changeEmitter: EventEmitter<string> = new EventEmitter<string>(true);
    // (true) -> async event emitter to avoid https://angular.io/errors/NG0100

  setQuery(q: string) {
    this.changeEmitter.emit(q);
  }

  onChange(callback: Function) {
    this.changeEmitter.subscribe(callback);
  }


  constructor() { }
}
