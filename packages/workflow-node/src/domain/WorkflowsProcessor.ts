import { fetchWorkflow } from '../adapters/WorkflowManagerAdapter'
import { executeWorkflow } from './WorkflowRunner'
import { BusinessEvent } from './models/BusinessEvents'
import { EventPayload } from './models/EventPayload'

export const processMessage = async <T = unknown>(
  event: BusinessEvent,
  { tenantId, metadata }: EventPayload<T>,
): Promise<void> => {
  const { workflow, initialStep } = await fetchWorkflow({ tenantId, event })

  // TODO: log if workflow is not found

  executeWorkflow({ workflow, step: initialStep, metadata })
}
