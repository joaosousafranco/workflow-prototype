import { RedisClientType, createClient } from 'redis'
import { BusinessEvent } from '../../../domain/models/BusinessEvents'
import { PubSubProvider, SubscribeHandler } from './PubSubProvider'

type RedisPubSubProviderConfig = {
  host?: string
  port?: string
  username?: string
  password?: string
}

export class RedisPubSubProvider implements PubSubProvider {
  private client: RedisClientType

  constructor(private config: RedisPubSubProviderConfig = {}) {
    // empty ctor
  }

  public async connect(): Promise<void> {
    const { host, port, username, password } = this.config

    this.client = createClient({
      url: `redis://${username}:${password}@${host}:${port}`,
    })

    await this.client.connect()
  }

  public subscribe(event: BusinessEvent, handler: SubscribeHandler): void {
    this.client.subscribe(event, (message) => {
      // TODO: add class validator
      // TODO: add error handling, message parse throws
      handler(JSON.parse(message))
    })
  }
}
