import { CustomError } from '@workflow-prototype/library'

export class PubSubProviderNotImplementedError extends CustomError {
  constructor(providerType: string) {
    super(`PubSubProvider of type "${providerType}" is not implemented.`)
  }
}
