import { configuration } from '../../../configuration'
import { EventEmitterPubSubProvider } from './EventEmitterPubSubProvider'
import { createPubSubProvider } from './PubSubProviderFactory'
import { PubSubProviderNotImplementedError } from './PubSubProviderNotImplementedError'
import * as RedisPubSub from './RedisPubSubProvider'

describe('PubSubProviderFactory', () => {
  describe('#createPubSubProvider', () => {
    it.each`
      provider           | expectedType
      ${'event-emitter'} | ${EventEmitterPubSubProvider}
      ${'redis'}         | ${RedisPubSub.RedisPubSubProvider}
    `('should create a PubSubProvider', async ({ provider, expectedType }) => {
      const connectSpy = jest
        .spyOn(expectedType.prototype, 'connect')
        .mockResolvedValue(undefined)

      const pubSubProvider = await createPubSubProvider(provider)

      expect(pubSubProvider).toBeInstanceOf(expectedType)
      expect(connectSpy).toHaveBeenCalledTimes(1)
      expect(connectSpy).toHaveBeenCalledWith()
    })

    it('should create a redis provider with correct configuration', async () => {
      const provider = 'redis'

      jest.spyOn(RedisPubSub, 'RedisPubSubProvider').mockImplementation(
        () =>
          ({
            connect: jest.fn(),
          }) as unknown as RedisPubSub.RedisPubSubProvider,
      )

      await createPubSubProvider(provider)

      expect(RedisPubSub.RedisPubSubProvider).toHaveBeenCalledTimes(1)
      expect(RedisPubSub.RedisPubSubProvider).toHaveBeenCalledWith(configuration.redis)
    })

    it('should throw an error if provider type is invalid', async () => {
      await expect(createPubSubProvider('invalid-provider')).rejects.toThrow(
        new PubSubProviderNotImplementedError('invalid-provider'),
      )
    })
  })
})
