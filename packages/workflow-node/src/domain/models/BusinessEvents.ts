export const BusinessEvents = [
  'incident.created',
  'incident.updated',
  'incident.deleted',
] as const

export type BusinessEvent = (typeof BusinessEvents)[number]
