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
        .get('/workflow')
        .query({ tenantId: 'some-tenant-id', event: 'some-event' })
        .reply(200, {
          workflow: {
            id: 'some-workflow-id',
            name: 'some-workflow-name',
            tenantId: 'some-tenant-id',
            event: 'some-event',
          },
          initialStep: {
            name: 'LogWorkflowStep',
            truthyNextStep: {
              name: 'ConditionWorkflowStep',
              truthyNextStep: {
                name: 'LogWorkflowStep',
              },
              falsyNextStep: {
                name: 'ConditionWorkflowStep',
                falsyNextStep: {
                  name: 'LogWorkflowStep',
                },
              },
            },
          },
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
          truthyNextStep: new ConditionWorkflowStep({
            truthyNextStep: new LogWorkflowStep(),
            falsyNextStep: new ConditionWorkflowStep({
              falsyNextStep: new LogWorkflowStep(),
            }),
          }),
        }),
      })
    })
  })
})
