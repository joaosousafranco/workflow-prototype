import { EventEmitterPubSubAdapter } from './EventEmitterPubSubAdapter'
import { createPubSubAdapter } from './PubSubAdapterFactory'
import { PubSubAdapterNotImplementedError } from './PubSubAdapterNotImplementedError'
import { RedisPubSubAdapter } from './RedisPubSubAdapter'

describe('PubSubAdapterFactory', () => {
  describe('#createPubSubAdapter', () => {
    it.each`
      adapter            | expectedType
      ${'event-emitter'} | ${EventEmitterPubSubAdapter}
      ${'redis'}         | ${RedisPubSubAdapter}
    `('should create a PubSubAdapter', async ({ adapter, expectedType }) => {
      const connectSpy = jest
        .spyOn(expectedType.prototype, 'connect')
        .mockResolvedValue(undefined)

      const pubSubAdapter = await createPubSubAdapter(adapter)

      expect(pubSubAdapter).toBeInstanceOf(expectedType)
      expect(connectSpy).toHaveBeenCalledTimes(1)
      expect(connectSpy).toHaveBeenCalledWith()
    })

    it('should throw an error if adapter type is invalid', async () => {
      await expect(createPubSubAdapter('invalid-adapter')).rejects.toThrow(
        new PubSubAdapterNotImplementedError('invalid-adapter'),
      )
    })
  })
})
