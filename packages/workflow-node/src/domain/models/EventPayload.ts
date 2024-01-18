export class EventPayload<T> {
  constructor(
    public readonly tenantId: string,
    public readonly metadata?: T,
  ) {
    this.tenantId = tenantId
    this.metadata = metadata
  }
}
