import { configuration } from '../../../configuration'
import { EventEmitterPubSubAdapter } from './EventEmitterPubSubAdapter'
import { createPubSubAdapter } from './PubSubAdapterFactory'
import { PubSubAdapterNotImplementedError } from './PubSubAdapterNotImplementedError'
import * as RedisPubSub from './RedisPubSubAdapter'

describe('PubSubAdapterFactory', () => {
  describe('#createPubSubAdapter', () => {
    it.each`
      adapter            | expectedType
      ${'event-emitter'} | ${EventEmitterPubSubAdapter}
      ${'redis'}         | ${RedisPubSub.RedisPubSubAdapter}
    `('should create a PubSubAdapter', async ({ adapter, expectedType }) => {
      const connectSpy = jest
        .spyOn(expectedType.prototype, 'connect')
        .mockResolvedValue(undefined)

      const pubSubAdapter = await createPubSubAdapter(adapter)

      expect(pubSubAdapter).toBeInstanceOf(expectedType)
      expect(connectSpy).toHaveBeenCalledTimes(1)
      expect(connectSpy).toHaveBeenCalledWith()
    })

    it('should create a redis adapter with correct configuration', async () => {
      const adapter = 'redis'

      jest.spyOn(RedisPubSub, 'RedisPubSubAdapter').mockImplementation(
        () =>
          ({
            connect: jest.fn(),
          }) as unknown as RedisPubSub.RedisPubSubAdapter,
      )

      await createPubSubAdapter(adapter)

      expect(RedisPubSub.RedisPubSubAdapter).toHaveBeenCalledTimes(1)
      expect(RedisPubSub.RedisPubSubAdapter).toHaveBeenCalledWith(configuration.redis)
    })

    it('should throw an error if adapter type is invalid', async () => {
      await expect(createPubSubAdapter('invalid-adapter')).rejects.toThrow(
        new PubSubAdapterNotImplementedError('invalid-adapter'),
      )
    })
  })
})
