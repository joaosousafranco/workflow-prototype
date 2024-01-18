import { CustomError } from '@workflow-prototype/library'

export class PubSubAdapterNotImplementedError extends CustomError {
  constructor(adapterType: string) {
    super(`PubSubAdapter of type "${adapterType}" is not implemented.`)
  }
}
