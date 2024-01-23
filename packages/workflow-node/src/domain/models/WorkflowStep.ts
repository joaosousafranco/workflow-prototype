/* eslint-disable no-use-before-define */
import { CustomError } from '@workflow-prototype/library'
import { Workflow } from './Workflow'

export type WorkflowExecuteOptions<T = unknown> = {
  workflow: Workflow
  workflowData: T
}

export type WorkflowStepOptions<M = unknown> = {
  metadata?: M
  truthyNextStep?: WorkflowStep
  falsyNextStep?: WorkflowStep
}

export abstract class WorkflowStep<M = unknown> {
  public readonly metadata?: M

  public readonly truthyNextStep?: WorkflowStep

  public readonly falsyNextStep?: WorkflowStep

  constructor({ truthyNextStep, falsyNextStep, metadata }: WorkflowStepOptions<M> = {}) {
    this.metadata = metadata
    this.truthyNextStep = truthyNextStep
    this.falsyNextStep = falsyNextStep
  }

  public abstract execute<R>(
    data: WorkflowExecuteOptions,
  ): Promise<R | boolean | CustomError | void>
}
