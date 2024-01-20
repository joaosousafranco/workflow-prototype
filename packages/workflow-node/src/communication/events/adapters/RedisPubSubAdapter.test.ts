import { EventEmitter } from 'events'
import * as redis from 'redis'
import { RedisPubSubAdapter } from './RedisPubSubAdapter'

describe('RedisPubSubAdapter', () => {
  afterEach(jest.clearAllMocks)

  describe('#connect', () => {
    it('should connect to redis with the provided config', async () => {
      const connectSpy = jest.fn()
      const createClientSpy = jest.spyOn(redis, 'createClient').mockReturnValue({
        connect: connectSpy,
      } as unknown as redis.RedisClientType)

      const adapter = new RedisPubSubAdapter({
        host: 'host',
        port: '1234',
        username: 'username',
        password: 'password',
      })

      await adapter.connect()

      expect(connectSpy).toHaveBeenCalledTimes(1)
      expect(connectSpy).toHaveBeenCalledWith()

      expect(createClientSpy).toHaveBeenCalledTimes(1)
      expect(createClientSpy).toHaveBeenCalledWith({
        url: 'redis://username:password@host:1234',
      })
    })
  })

  describe('#subscribe', () => {
    it('should subscribe event', async () => {
      const subscribeSpy = jest.fn()
      jest.spyOn(redis, 'createClient').mockReturnValue({
        connect: jest.fn(),
        subscribe: subscribeSpy,
      } as unknown as redis.RedisClientType)

      const adapter = new RedisPubSubAdapter()

      await adapter.connect()

      adapter.subscribe('incident.created', jest.fn())

      expect(subscribeSpy).toHaveBeenCalledTimes(1)
      expect(subscribeSpy).toHaveBeenCalledWith('incident.created', expect.any(Function))
    })

    it('should call handler with json parsed when subscribed event receives message', async () => {
      class MockEmitter extends EventEmitter {}

      const emitter = new MockEmitter()

      jest.spyOn(redis, 'createClient').mockReturnValue({
        connect: jest.fn(),
        subscribe: (event: string, handler: (message: string) => void) => {
          emitter.on(event, handler)
        },
      } as unknown as redis.RedisClientType)

      const mockHandler = jest.fn()

      const adapter = new RedisPubSubAdapter()

      await adapter.connect()
      adapter.subscribe('incident.created', mockHandler)

      emitter.emit('incident.created', JSON.stringify({ foo: 'bar' }))

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockHandler).toHaveBeenCalledWith({ foo: 'bar' })
    })
  })
})
