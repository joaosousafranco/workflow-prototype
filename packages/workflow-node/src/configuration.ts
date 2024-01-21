export const configuration = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
    username: process.env.REDIS_USERNAME || '',
    password: process.env.REDIS_PASSWORD || '',
  },
  workflowManager: {
    baseUrl: process.env.WORKFLOW_MANAGER_BASE_URL || 'http://localhost:3000',
  },
}
