import { EventEmitter } from 'events'
import { BusinessEvent } from '../../../domain/models/BusinessEvents'
import { PubSubProvider, SubscribeHandler } from './PubSubProvider'

export class EventEmitterPubSubProvider extends EventEmitter implements PubSubProvider {
  public async connect(): Promise<void> {
    return Promise.resolve()
  }

  public subscribe(event: BusinessEvent, handler: SubscribeHandler) {
    this.on(event, handler)
  }
}
