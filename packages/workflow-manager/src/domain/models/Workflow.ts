import { WorkflowStep } from './WorkflowStep'

export type Workflow = {
  id: string
  name: string
  tenantId: string
  event: string
  initialStep: WorkflowStep
}
