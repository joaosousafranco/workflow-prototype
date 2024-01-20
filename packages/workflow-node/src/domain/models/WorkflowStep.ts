/* eslint-disable no-use-before-define */
import { CustomError } from '@workflow-prototype/library'
import { Workflow } from './Workflow'

export abstract class WorkflowStep<T = unknown> {
  public truthyNextStep?: WorkflowStep<T>

  public falsyNextStep?: WorkflowStep<T>

  public abstract execute<R>(data: {
    workflow: Workflow
    metadata: T
  }): Promise<R | boolean | CustomError | void>
}
