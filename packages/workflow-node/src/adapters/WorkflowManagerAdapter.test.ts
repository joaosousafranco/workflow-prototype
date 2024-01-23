import * as nock from 'nock'
import { configuration } from '../configuration'
import { ConditionWorkflowStep } from '../domain/steps/ConditionWorkflowStep'
import { LogWorkflowStep } from '../domain/steps/LogWorkflowStep'
import { fetchWorkflow } from './WorkflowManagerAdapter'

describe('WorkflowManagerAdapter', () => {
  afterEach(nock.cleanAll)

  describe('#fetchWorkflow', () => {
    it('fetches a workflow from workflow manager', async () => {
      nock(configuration.workflowManager.baseUrl)
        .get('/api/tenant/some-tenant-id/workflow')
        .query({ event: 'some-event' })
        .reply(200, {
          workflows: [
            {
              id: 'some-workflow-id',
              name: 'some-workflow-name',
              tenantId: 'some-tenant-id',
              event: 'some-event',
              initialStep: {
                name: 'LogWorkflowStep',
                metadata: { prefix: 'Starting' },
                truthyNextStep: {
                  name: 'ConditionWorkflowStep',
                  metadata: [
                    {
                      parameter: 'some-parameter',
                      value: 'some-value',
                      operator: '===',
                    },
                  ],
                },
                falsyNextStep: {
                  name: 'LogWorkflowStep',
                  metadata: { prefix: 'Falsy' },
                },
              },
            },
          ],
        })

      const workflow = await fetchWorkflow({
        tenantId: 'some-tenant-id',
        event: 'some-event',
      })

      expect(workflow).toEqual({
        workflow: {
          id: 'some-workflow-id',
          name: 'some-workflow-name',
          tenantId: 'some-tenant-id',
          event: 'some-event',
        },
        initialStep: new LogWorkflowStep({
          metadata: { prefix: 'Starting' },
          truthyNextStep: new ConditionWorkflowStep({
            metadata: [
              {
                parameter: 'some-parameter',
                value: 'some-value',
                operator: '===',
              },
            ],
          }),
          falsyNextStep: new LogWorkflowStep({ metadata: { prefix: 'Falsy' } }),
        }),
      })
    })
  })
})
