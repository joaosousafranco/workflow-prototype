import { EventEmitter } from 'events'
import { BusinessEvent } from '../../../domain/models/BusinessEvents'
import { EventPayload } from '../../../domain/models/EventPayload'
import { PubSubAdapter, SubscribeHandler } from './PubSubAdapter'

export class EventEmitterPubSubAdapter extends EventEmitter implements PubSubAdapter {
  public async connect(): Promise<void> {
    return Promise.resolve()
  }

  public subscribe(event: BusinessEvent, handler: SubscribeHandler) {
    this.on(event, handler)
  }

  public publish<P, T extends EventPayload<P>>(event: BusinessEvent, message: T) {
    this.emit(event, message)
  }
}
