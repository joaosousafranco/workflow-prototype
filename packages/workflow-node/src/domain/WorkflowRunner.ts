import { CustomError, isError } from '@workflow-prototype/library'
import { Workflow } from './models/Workflow'
import { WorkflowStep } from './models/WorkflowStep'

export const executeWorkflow = async <T = unknown>({
  workflow,
  step,
  metadata,
}: {
  workflow: Workflow
  step: WorkflowStep
  metadata: T
}): Promise<void> => {
  const resultOrError = await step.execute({ workflow, workflowData: metadata })

  if (isError(CustomError)(resultOrError)) {
    // TODO: log error
    return
  }

  const nextStep = resultOrError === false ? step.falsyNextStep : step.truthyNextStep

  if (nextStep) {
    executeWorkflow({ workflow, step: nextStep, metadata })
  }
}
