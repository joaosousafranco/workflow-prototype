import { processMessage } from '../../domain/WorkflowsProcessor'
import { BusinessEvents } from '../../domain/models/BusinessEvents'
import { EventPayload } from '../../domain/models/EventPayload'
import { createPubSubProvider } from './providers/PubSubProviderFactory'

export class WorkflowHandler {
  public async start(): Promise<void> {
    const pubSubProvider = await createPubSubProvider('redis')

    BusinessEvents.forEach((event) => {
      pubSubProvider.subscribe(event, (message: EventPayload<unknown>) => {
        processMessage(event, message)
      })
    })
  }
}
