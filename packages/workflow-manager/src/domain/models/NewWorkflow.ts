import { WorkflowStep } from './WorkflowStep'

export type NewWorkflow = {
  name: string
  event: string
  initialStep: WorkflowStep
}
