import { WorkflowStep } from '../models/WorkflowStep'

export type LogWorkflowStepMetadata = {
  prefix: string
}

export class LogWorkflowStep extends WorkflowStep<LogWorkflowStepMetadata> {
  public async execute(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('LogWorkflowStep - ', this.metadata?.prefix)
  }
}
