import { NewWorkflow } from '../domain/models/NewWorkflow'
import { Workflow } from '../domain/models/Workflow'
import { commitDatabase, getDatabase } from './RedisStore'

export const getWorkflow = async ({
  tenantId,
  workflowId,
}: {
  tenantId: string
  workflowId: string
}): Promise<Workflow | undefined> => {
  const workflows = await getDatabase()

  return Object.values(workflows[tenantId] || {})
    .flat()
    .find((workflow) => workflow.id === workflowId)
}

export const getWorkflowsByEvent = async ({
  tenantId,
  event,
}: {
  tenantId: string
  event: string
}): Promise<Workflow[]> => {
  const workflows = await getDatabase()

  return Object.values(workflows[tenantId]?.[event] || []).filter(
    (workflow) => workflow.event === event,
  )
}

export const createWorkflow = async ({
  tenantId,
  newWorkflow,
}: {
  tenantId: string
  newWorkflow: NewWorkflow
}): Promise<Workflow> => {
  const workflows = await getDatabase()

  if (!workflows[tenantId]) {
    workflows[tenantId] = {}
  }

  if (!workflows[tenantId][newWorkflow.event]) {
    workflows[tenantId][newWorkflow.event] = []
  }

  const workflow: Workflow = {
    id: `${workflows[tenantId][newWorkflow.event].length + 1}`,
    tenantId,
    name: newWorkflow.name,
    event: newWorkflow.event,
    initialStep: newWorkflow.initialStep,
  }

  workflows[tenantId][workflow.event].push(workflow)

  await commitDatabase()

  return workflow
}

export const updateWorkflow = async ({
  tenantId,
  workflow,
}: {
  tenantId: string
  workflow: Workflow
}): Promise<Workflow> => {
  const workflows = await getDatabase()

  const existentWorkflow = await getWorkflow({ tenantId, workflowId: workflow.id })

  if (existentWorkflow) {
    workflows[tenantId][workflow.event][parseInt(workflow.id, 10) - 1] = workflow
  }

  await commitDatabase()

  return workflow
}
