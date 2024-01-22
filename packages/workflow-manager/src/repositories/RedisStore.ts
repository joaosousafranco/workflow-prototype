import { RedisClientType, createClient } from 'redis'
import { Workflow } from '../domain/models/Workflow'

let client: RedisClientType

const DATABASE_KEY = 'workflows'

const database: {
  loaded: boolean
  workflows: { [tenantId: string]: { [event: string]: Workflow[] } }
} = { loaded: false, workflows: {} }

const connect = async (): Promise<void> => {
  client = createClient({
    url: 'redis://:1qaz2wsX@localhost:6379',
  })

  await client.connect()

  const remoteDatabase = await client.get(DATABASE_KEY)

  if (remoteDatabase) {
    database.workflows = { ...JSON.parse(remoteDatabase) }
  }
}

const getRedisStore = async (): Promise<RedisClientType> => {
  if (!client) {
    await connect()
  }

  return client
}

export const getDatabase = async () => {
  if (!database.loaded) {
    const store = await getRedisStore()

    const remoteDatabase = await store.get(DATABASE_KEY)

    if (remoteDatabase) {
      database.workflows = { ...JSON.parse(remoteDatabase) }
      database.loaded = true
    }
  }

  return database.workflows
}

export const commitDatabase = async () => {
  const store = await getRedisStore()

  await store.set(DATABASE_KEY, JSON.stringify(database.workflows))
}
