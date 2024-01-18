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
        port: 1234,
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
})
