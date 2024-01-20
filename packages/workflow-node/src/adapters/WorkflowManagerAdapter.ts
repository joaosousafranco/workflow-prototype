import { Workflow } from '../domain/models/Workflow'
import { WorkflowStep } from '../domain/models/WorkflowStep'
import { ConditionWorkflowStep } from '../domain/steps/ConditionWorkflowStep'
import { LogWorkflowStep } from '../domain/steps/LogWorkflowStep'

export const fetchWorkflow = async ({
  tenantId,
  event,
}: {
  tenantId: string
  event: string
}): Promise<{ workflow: Workflow; initialStep?: WorkflowStep }> => {
  const initialStep = new LogWorkflowStep()

  initialStep.truthyNextStep = new ConditionWorkflowStep()

  initialStep.truthyNextStep.truthyNextStep = new LogWorkflowStep()

  return {
    workflow: {
      id: 'some-workflow-id',
      name: 'some-workflow-name',
      tenantId,
      event,
    },
    initialStep,
  }
}
