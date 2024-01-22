import { NextRequest, NextResponse } from 'next/server'
import { getWorkflow } from '../../../../../../src/domain/WorkflowsService'

type GetWorkflowParams = {
  params: {
    tenantId: string
    workflowId: string
  }
}

export async function GET(
  _: NextRequest,
  { params: { tenantId, workflowId } }: GetWorkflowParams,
) {
  const workflow = await getWorkflow({
    tenantId,
    workflowId,
  })

  return NextResponse.json({ workflow })
}
