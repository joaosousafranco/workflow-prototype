import { BusinessEvent } from '../../../domain/models/BusinessEvents'
import { EventPayload } from '../../../domain/models/EventPayload'

export type SubscribeHandler = <P, T extends EventPayload<P>>(message: T) => void

export interface PubSubAdapter {
  connect(): Promise<void>

  subscribe(event: BusinessEvent, handler: SubscribeHandler): void

  publish<P, T extends EventPayload<P>>(event: BusinessEvent, message: T): void
}
