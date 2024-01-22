import { NextRequest } from 'next/server'
import { RedisClientType, createClient } from 'redis'
import { Incident } from '../../../src/domain/models/Incident'

type EventPayload = {
  tenantId: string
  metadata: Incident
}

let client: RedisClientType

const getRedisClient = async () => {
  if (client) {
    return client
  }

  client = createClient({
    url: 'redis://:1qaz2wsX@localhost:6379',
  })

  await client.connect()

  return client
}

const createIncident = async (tenantId: string, incident: Incident): Promise<void> => {
  const redisClient = await getRedisClient()

  const message: EventPayload = {
    tenantId,
    metadata: incident,
  }

  await redisClient.publish('incident.created', JSON.stringify(message))
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)

  const tenantId = url.searchParams.get('tenantId') || 'some-tenant-id'
  const incident: Incident = await request.json()

  await createIncident(tenantId, incident)

  return new Response()
}
