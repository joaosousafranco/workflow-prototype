/* eslint-disable no-use-before-define */
import { CustomError } from '@workflow-prototype/library'
import { Workflow } from './Workflow'

export type WorkflowStepOptions = {
  truthyNextStep?: WorkflowStep
  falsyNextStep?: WorkflowStep
}

export abstract class WorkflowStep<T = unknown> {
  public readonly truthyNextStep?: WorkflowStep<T>

  public readonly falsyNextStep?: WorkflowStep<T>

  constructor({ truthyNextStep, falsyNextStep }: WorkflowStepOptions = {}) {
    this.truthyNextStep = truthyNextStep
    this.falsyNextStep = falsyNextStep
  }

  public abstract execute<R>(data: {
    workflow: Workflow
    metadata: T
  }): Promise<R | boolean | CustomError | void>
}
