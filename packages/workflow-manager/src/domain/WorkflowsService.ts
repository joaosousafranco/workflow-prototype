import * as WorkflowRepository from '../repositories/WorkflowRepository'
import { NewWorkflow } from './models/NewWorkflow'
import { Workflow } from './models/Workflow'

export const createWorkflow = async ({
  tenantId,
  workflow,
}: {
  tenantId: string
  workflow: NewWorkflow
}): Promise<Workflow> =>
  WorkflowRepository.createWorkflow({ tenantId, newWorkflow: workflow })

export const updateWorkflow = async ({
  tenantId,
  workflow,
}: {
  tenantId: string
  workflow: Workflow
}): Promise<Workflow> => WorkflowRepository.updateWorkflow({ tenantId, workflow })

export const getWorkflow = async ({
  tenantId,
  workflowId,
}: {
  tenantId: string
  workflowId: string
}): Promise<Workflow> => WorkflowRepository.getWorkflow({ tenantId, workflowId })

export const getWorkflowsByEvent = async ({
  tenantId,
  event,
}: {
  tenantId: string
  event: string
}): Promise<Workflow[]> => WorkflowRepository.getWorkflowsByEvent({ tenantId, event })
