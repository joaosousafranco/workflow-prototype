import { EventEmitter } from 'events'
import { BusinessEvent } from '../../../domain/models/BusinessEvents'
import { PubSubAdapter, SubscribeHandler } from './PubSubAdapter'

export class EventEmitterPubSubAdapter extends EventEmitter implements PubSubAdapter {
  public async connect(): Promise<void> {
    return Promise.resolve()
  }

  public subscribe(event: BusinessEvent, handler: SubscribeHandler) {
    this.on(event, handler)
  }
}
