import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
import { Incident } from './models/Incident';

type EventPayload = {
  tenantId: string;
  metadata: Incident;
};

let client: RedisClientType;

const getRedisClient = async () => {
  if (client) {
    return client;
  }

  client = createClient({
    url: 'redis://:1qaz2wsX@localhost:6379',
  });

  await client.connect();

  return client;
};

@Injectable()
export class AppService {
  async createIncident(tenantId: string, incident: Incident): Promise<void> {
    const redisClient = await getRedisClient();

    const message: EventPayload = {
      tenantId,
      metadata: incident,
    };

    await redisClient.publish('incident.created', JSON.stringify(message));
  }
}
