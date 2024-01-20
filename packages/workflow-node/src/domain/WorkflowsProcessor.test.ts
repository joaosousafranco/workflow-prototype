import * as WorkflowManagerAdapter from '../adapters/WorkflowManagerAdapter'
import * as WorkflowRunner from './WorkflowRunner'
import { processMessage } from './WorkflowsProcessor'
import { Workflow } from './models/Workflow'

describe('WorkflowsProcessor', () => {
  afterEach(jest.clearAllMocks)

  describe('#processMessage', () => {
    it('should execute message workflow', async () => {
      const fetchWorkflowSpy = jest
        .spyOn(WorkflowManagerAdapter, 'fetchWorkflow')
        .mockResolvedValue({
          workflow: {
            name: 'some-workflow',
            tenantId: 'tenantId',
            event: 'incident.created',
            id: 'some-workflow-id',
          },
        })
      jest.spyOn(WorkflowRunner, 'executeWorkflow').mockResolvedValue()

      await processMessage('incident.created', {
        tenantId: 'tenantId',
        metadata: { foo: 'bar' },
      })

      expect(fetchWorkflowSpy).toHaveBeenCalledTimes(1)
      expect(fetchWorkflowSpy).toHaveBeenCalledWith({
        tenantId: 'tenantId',
        event: 'incident.created',
      })
    })

    it('should execute the workflow', async () => {
      const mockedWorkflow: Workflow = {
        name: 'some-workflow',
        tenantId: 'tenantId',
        event: 'incident.created',
        id: 'some-workflow-id',
      }

      jest
        .spyOn(WorkflowManagerAdapter, 'fetchWorkflow')
        .mockResolvedValue({ workflow: mockedWorkflow })
      const workflowRunnerSpy = jest
        .spyOn(WorkflowRunner, 'executeWorkflow')
        .mockResolvedValue()

      await processMessage('incident.created', {
        tenantId: 'tenantId',
        metadata: { foo: 'bar' },
      })

      expect(workflowRunnerSpy).toHaveBeenCalledTimes(1)
      expect(workflowRunnerSpy).toHaveBeenCalledWith({
        workflow: mockedWorkflow,
        metadata: { foo: 'bar' },
      })
    })
  })
})
