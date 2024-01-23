import * as WorkflowsProcessor from '../../domain/WorkflowsProcessor'
import { BusinessEvent, BusinessEvents } from '../../domain/models/BusinessEvents'
import { EventPayload } from '../../domain/models/EventPayload'
import { WorkflowHandler } from './WorkflowHandler'
import { EventEmitterPubSubProvider } from './providers/EventEmitterPubSubProvider'
import * as PubSubProviderFactory from './providers/PubSubProviderFactory'

describe('WorkflowHandler', () => {
  afterEach(jest.clearAllMocks)

  describe('#start', () => {
    it.each(Object.values(BusinessEvents))(
      'handle message for event %s',
      async (event: BusinessEvent) => {
        const mockedPubSubProvider = new EventEmitterPubSubProvider()

        jest
          .spyOn(PubSubProviderFactory, 'createPubSubProvider')
          .mockResolvedValue(mockedPubSubProvider)

        const processWorkflowsSpy = jest
          .spyOn(WorkflowsProcessor, 'processMessage')
          .mockResolvedValue()

        const workflowHandler = new WorkflowHandler()

        await workflowHandler.start()

        mockedPubSubProvider.emit(
          event,
          new EventPayload('test-tenant', {
            event,
            incidentName: 'some incident',
            country: 'Portugal',
            alertLevel: 1,
          }),
        )

        expect(processWorkflowsSpy).toHaveBeenCalledTimes(1)
        expect(processWorkflowsSpy).toHaveBeenCalledWith(event, {
          tenantId: 'test-tenant',
          metadata: {
            event,
            incidentName: 'some incident',
            country: 'Portugal',
            alertLevel: 1,
          },
        })
      },
    )
  })
})
