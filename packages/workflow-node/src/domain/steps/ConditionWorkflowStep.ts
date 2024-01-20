import { Workflow } from '../models/Workflow'
import { WorkflowStep } from '../models/WorkflowStep'

type Condition = {
  country: string
}

export class ConditionWorkflowStep extends WorkflowStep<Condition> {
  public async execute({
    metadata,
  }: {
    workflow: Workflow
    metadata: Condition
  }): Promise<boolean> {
    return metadata.country === 'Portugal'
  }
}
