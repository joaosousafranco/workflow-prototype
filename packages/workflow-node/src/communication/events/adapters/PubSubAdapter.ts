import { BusinessEvent } from '../../../domain/models/BusinessEvents'
import { EventPayload } from '../../../domain/models/EventPayload'

export type SubscribeHandler = <P, T extends EventPayload<P>>(message: T) => void

export interface PubSubAdapter {
  connect(): Promise<void>

  subscribe(event: BusinessEvent, handler: SubscribeHandler): void
}
