import { BusinessEvent } from './models/BusinessEvents'
import { EventPayload } from './models/EventPayload'

export const processMessage = async <T>(
  event: BusinessEvent,
  message: EventPayload<T>,
): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(`Processing message ${event} with payload ${JSON.stringify(message)}`)
}
