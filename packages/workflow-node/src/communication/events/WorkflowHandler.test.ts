import * as WorkflowsProcessor from '../../domain/WorkflowsProcessor'
import { BusinessEvent, BusinessEvents } from '../../domain/models/BusinessEvents'
import { EventPayload } from '../../domain/models/EventPayload'
import { WorkflowHandler } from './WorkflowHandler'
import { EventEmitterPubSubAdapter } from './adapters/EventEmitterPubSubAdapter'
import * as PubSubAdapterFactory from './adapters/PubSubAdapterFactory'

describe('WorkflowHandler', () => {
  afterEach(jest.clearAllMocks)

  describe('#start', () => {
    it.each(Object.values(BusinessEvents))(
      'handle message for event %s',
      async (event: BusinessEvent) => {
        const mockedPubSubAdapter = new EventEmitterPubSubAdapter()

        jest
          .spyOn(PubSubAdapterFactory, 'createPubSubAdapter')
          .mockResolvedValue(mockedPubSubAdapter)

        const processWorkflowsSpy = jest
          .spyOn(WorkflowsProcessor, 'processMessage')
          .mockResolvedValue()

        const workflowHandler = new WorkflowHandler()

        await workflowHandler.start()

        mockedPubSubAdapter.publish(
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
