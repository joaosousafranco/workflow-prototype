import axios from 'axios'
import { configuration } from '../configuration'
import { Workflow } from '../domain/models/Workflow'
import { WorkflowStep, WorkflowStepOptions } from '../domain/models/WorkflowStep'
import {
  ConditionWorkflowStep,
  ConditionWorkflowStepMetadata,
} from '../domain/steps/ConditionWorkflowStep'
import { LogWorkflowStep, LogWorkflowStepMetadata } from '../domain/steps/LogWorkflowStep'

type WorkflowResponseStep = {
  name: string
  metadata?: unknown
  truthyNextStep?: WorkflowResponseStep
  falsyNextStep?: WorkflowResponseStep
}

type WorkflowsResponse = {
  workflows: {
    id: string
    name: string
    tenantId: string
    event: string
    initialStep: WorkflowResponseStep
  }[]
}

const WORKFLOW_STEPS_MAP: {
  [key: string]: (options: WorkflowStepOptions) => WorkflowStep
} = {
  ConditionWorkflowStep: (options: WorkflowStepOptions<ConditionWorkflowStepMetadata>) =>
    new ConditionWorkflowStep(options),
  LogWorkflowStep: (options: WorkflowStepOptions<LogWorkflowStepMetadata>) =>
    new LogWorkflowStep(options),
}

const buildWorkflowFromResponse = ({
  initialStep,
}: {
  initialStep: WorkflowResponseStep
}): WorkflowStep =>
  // TODO: Add error handling
  WORKFLOW_STEPS_MAP[initialStep.name]({
    metadata: initialStep.metadata,
    truthyNextStep: initialStep.truthyNextStep
      ? buildWorkflowFromResponse({ initialStep: initialStep.truthyNextStep })
      : undefined,
    falsyNextStep: initialStep.falsyNextStep
      ? buildWorkflowFromResponse({ initialStep: initialStep.falsyNextStep })
      : undefined,
  })

export const fetchWorkflow = async ({
  tenantId,
  event,
}: {
  tenantId: string
  event: string
}): Promise<{ workflow: Workflow; initialStep?: WorkflowStep }> => {
  // TODO: Add error handling

  const workflowResponse = await axios<WorkflowsResponse>(
    `${configuration.workflowManager.baseUrl}/api/tenant/${tenantId}/workflow?event=${event}`,
    {},
  )

  // TODO: add support to return multiple workflows
  const { id, name, initialStep } = workflowResponse.data.workflows[0]

  return {
    workflow: { id, name, tenantId, event },
    initialStep: buildWorkflowFromResponse({ initialStep }),
  }
}
