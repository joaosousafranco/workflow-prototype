import { RedisClientType, createClient } from 'redis'
import { BusinessEvent } from '../../../domain/models/BusinessEvents'
import { PubSubAdapter, SubscribeHandler } from './PubSubAdapter'

type RedisPubSubAdapterConfig = {
  host?: string
  port?: string
  username?: string
  password?: string
}

export class RedisPubSubAdapter implements PubSubAdapter {
  private client: RedisClientType

  constructor(private config: RedisPubSubAdapterConfig = {}) {
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
