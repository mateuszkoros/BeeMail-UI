import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadChangeService {

  @Output()
  change: EventEmitter<string> = new EventEmitter();

  changeThread(address: string) {
    this.change.emit(address);
  }
}
