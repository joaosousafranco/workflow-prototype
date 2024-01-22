export type WorkflowStep<T = unknown> = {
  name: string
  metadata?: T
  truthyNextStep?: WorkflowStep
  falsyNextStep?: WorkflowStep
}
