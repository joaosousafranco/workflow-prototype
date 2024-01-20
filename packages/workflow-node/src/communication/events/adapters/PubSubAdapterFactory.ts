import { configuration } from '../../../configuration'
import { EventEmitterPubSubAdapter } from './EventEmitterPubSubAdapter'
import { PubSubAdapter } from './PubSubAdapter'
import { PubSubAdapterNotImplementedError } from './PubSubAdapterNotImplementedError'
import { RedisPubSubAdapter } from './RedisPubSubAdapter'

export const createPubSubAdapter = async (
  adapterType: string,
): Promise<PubSubAdapter> => {
  let adapter: PubSubAdapter

  switch (adapterType) {
    case 'event-emitter':
      adapter = new EventEmitterPubSubAdapter()
      break
    case 'redis':
      adapter = new RedisPubSubAdapter(configuration.redis)
      break
    default:
      throw new PubSubAdapterNotImplementedError(adapterType)
  }

  await adapter.connect()

  return adapter
}
