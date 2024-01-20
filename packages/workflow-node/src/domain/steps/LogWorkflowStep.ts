import { Workflow } from '../models/Workflow'
import { WorkflowStep } from '../models/WorkflowStep'

export class LogWorkflowStep extends WorkflowStep {
  public async execute({
    workflow,
    metadata,
  }: {
    workflow: Workflow
    metadata: unknown
  }): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('LogWorkflowStep', { workflow, metadata })
  }
}
