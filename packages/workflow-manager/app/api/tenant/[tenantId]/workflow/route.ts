import { NextRequest, NextResponse } from 'next/server'
import {
  createWorkflow,
  getWorkflowsByEvent,
  updateWorkflow,
} from '../../../../../src/domain/WorkflowsService'
import { NewWorkflow } from '../../../../../src/domain/models/NewWorkflow'
import { Workflow } from '../../../../../src/domain/models/Workflow'

type CreateWorkflowParams = {
  params: {
    tenantId: string
  }
}

type UpdateWorkflowParams = {
  params: {
    tenantId: string
  }
}

type GetWorkflowByEventParams = {
  params: {
    tenantId: string
  }
}

type NewWorkflowRequest = NewWorkflow

export async function POST(
  request: NextRequest,
  { params: { tenantId } }: CreateWorkflowParams,
) {
  const newWorkflow = (await request.json()) as NewWorkflowRequest

  const workflow = await createWorkflow({ tenantId, workflow: newWorkflow })

  return NextResponse.json({ workflow })
}

export async function PUT(
  request: NextRequest,
  { params: { tenantId } }: UpdateWorkflowParams,
) {
  const workflowResponse = (await request.json()) as Workflow

  const workflow = await updateWorkflow({ tenantId, workflow: workflowResponse })

  return NextResponse.json({ workflow })
}

export async function GET(
  request: NextRequest,
  { params: { tenantId } }: GetWorkflowByEventParams,
) {
  const { searchParams } = new URL(request.url)
  const event = searchParams.get('event')

  const workflows = await getWorkflowsByEvent({ tenantId, event })

  return NextResponse.json({ workflows })
}
