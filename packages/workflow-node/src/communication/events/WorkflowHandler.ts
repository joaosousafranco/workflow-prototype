import { processMessage } from '../../domain/WorkflowsProcessor'
import { BusinessEvents } from '../../domain/models/BusinessEvents'
import { EventPayload } from '../../domain/models/EventPayload'
import { createPubSubAdapter } from './adapters/PubSubAdapterFactory'

export class WorkflowHandler {
  public async start(): Promise<void> {
    const pubSubAdapter = await createPubSubAdapter('redis')

    BusinessEvents.forEach((event) => {
      pubSubAdapter.subscribe(event, (message: EventPayload<unknown>) => {
        processMessage(event, message)
      })
    })
  }
}
