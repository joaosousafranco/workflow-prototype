/* eslint-disable max-classes-per-file */
import { CustomError } from '@workflow-prototype/library'
import { executeWorkflow } from './WorkflowRunner'
import { Workflow } from './models/Workflow'
import { WorkflowStep } from './models/WorkflowStep'

describe('WorkflowRunner', () => {
  afterEach(jest.clearAllMocks)

  describe('#executeWorkflow', () => {
    it('executes a single step workflow', async () => {
      const workflow: Workflow = {
        id: 'some-workflow-id',
        name: 'some-workflow-name',
        tenantId: 'some-tenant-id',
        event: 'some-event',
      }
      const workflowStepMock = {
        execute: jest.fn(),
      } as unknown as WorkflowStep

      const initialStep = workflowStepMock

      await executeWorkflow({ workflow, step: initialStep, metadata: {} })

      expect(workflowStepMock.execute).toHaveBeenCalledTimes(1)
      expect(workflowStepMock.execute).toHaveBeenCalledWith({ workflow, metadata: {} })
    })

    it('executes a workflows with multiple steps', async () => {
      const executeMock = jest.fn()
      class WorkflowStepMock implements WorkflowStep {
        public truthyNextStep?: WorkflowStep

        public falsyNextStep?: WorkflowStep

        public execute = executeMock
      }

      const workflow: Workflow = {
        id: 'some-workflow-id',
        name: 'some-workflow-name',
        tenantId: 'some-tenant-id',
        event: 'some-event',
      }

      const initialStep = new WorkflowStepMock()
      initialStep.truthyNextStep = new WorkflowStepMock()
      initialStep.truthyNextStep.truthyNextStep = new WorkflowStepMock()

      await executeWorkflow({ workflow, step: initialStep, metadata: {} })

      expect(executeMock).toHaveBeenCalledTimes(3)
      expect(executeMock).toHaveBeenCalledWith({ workflow, metadata: {} })
    })

    it('executes a workflows with falsy conditional steps', async () => {
      const executeMock = jest.fn()
      class WorkflowStepMock implements WorkflowStep {
        public truthyNextStep?: WorkflowStep

        public falsyNextStep?: WorkflowStep

        public execute = executeMock
      }
      class WorkflowStepConditionalMock implements WorkflowStep {
        public truthyNextStep?: WorkflowStep

        public falsyNextStep?: WorkflowStep

        public execute = jest.fn().mockImplementation(() => false)
      }

      const workflow: Workflow = {
        id: 'some-workflow-id',
        name: 'some-workflow-name',
        tenantId: 'some-tenant-id',
        event: 'some-event',
      }

      const initialStep = new WorkflowStepMock()
      initialStep.truthyNextStep = new WorkflowStepConditionalMock()
      initialStep.truthyNextStep.truthyNextStep = new WorkflowStepMock()

      await executeWorkflow({ workflow, step: initialStep, metadata: {} })

      expect(executeMock).toHaveBeenCalledTimes(1)
      expect(executeMock).toHaveBeenCalledWith({ workflow, metadata: {} })
    })

    it('executes a workflows with truthy conditional steps', async () => {
      const executeMock = jest.fn()
      class WorkflowStepMock implements WorkflowStep {
        public truthyNextStep?: WorkflowStep

        public falsyNextStep?: WorkflowStep

        public execute = executeMock
      }
      class WorkflowStepConditionalMock implements WorkflowStep {
        public truthyNextStep?: WorkflowStep

        public falsyNextStep?: WorkflowStep

        public execute = jest.fn().mockImplementation(() => true)
      }

      const workflow: Workflow = {
        id: 'some-workflow-id',
        name: 'some-workflow-name',
        tenantId: 'some-tenant-id',
        event: 'some-event',
      }

      const initialStep = new WorkflowStepMock()
      initialStep.truthyNextStep = new WorkflowStepConditionalMock()
      initialStep.truthyNextStep.truthyNextStep = new WorkflowStepMock()

      await executeWorkflow({ workflow, step: initialStep, metadata: {} })

      expect(executeMock).toHaveBeenCalledTimes(2)
      expect(executeMock).toHaveBeenCalledWith({ workflow, metadata: {} })
    })

    it('stops workflow execution when a error occurs', async () => {
      const executeMock = jest.fn()
      class WorkflowStepMock implements WorkflowStep {
        public truthyNextStep?: WorkflowStep

        public falsyNextStep?: WorkflowStep

        public execute = executeMock
      }
      class WorkflowStepErrorMock implements WorkflowStep {
        public truthyNextStep?: WorkflowStep

        public falsyNextStep?: WorkflowStep

        public execute = jest.fn().mockImplementation(() => new CustomError('some error'))
      }

      const workflow: Workflow = {
        id: 'some-workflow-id',
        name: 'some-workflow-name',
        tenantId: 'some-tenant-id',
        event: 'some-event',
      }

      const initialStep = new WorkflowStepMock()
      initialStep.truthyNextStep = new WorkflowStepErrorMock()
      initialStep.truthyNextStep.truthyNextStep = new WorkflowStepMock()

      await executeWorkflow({ workflow, step: initialStep, metadata: {} })

      expect(executeMock).toHaveBeenCalledTimes(1)
      expect(executeMock).toHaveBeenCalledWith({ workflow, metadata: {} })
    })
  })
})
