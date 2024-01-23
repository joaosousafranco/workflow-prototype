import { configuration } from '../../../configuration'
import { EventEmitterPubSubProvider } from './EventEmitterPubSubProvider'
import { PubSubProvider } from './PubSubProvider'
import { PubSubProviderNotImplementedError } from './PubSubProviderNotImplementedError'
import { RedisPubSubProvider } from './RedisPubSubProvider'

export const createPubSubProvider = async (
  providerType: string,
): Promise<PubSubProvider> => {
  let provider: PubSubProvider

  switch (providerType) {
    case 'event-emitter':
      provider = new EventEmitterPubSubProvider()
      break
    case 'redis':
      provider = new RedisPubSubProvider(configuration.redis)
      break
    default:
      throw new PubSubProviderNotImplementedError(providerType)
  }

  await provider.connect()

  return provider
}
