import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class EventsService {
  private emitter = new EventEmitter();

  emit(event: string, payload: any) {
    this.emitter.emit(event, payload);
  }

  on(event: string, cb: (payload: any) => void) {
    this.emitter.on(event, cb);
    return () => this.emitter.off(event, cb);
  }
}
