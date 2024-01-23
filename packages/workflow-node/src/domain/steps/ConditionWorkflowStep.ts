import { WorkflowExecuteOptions, WorkflowStep } from '../models/WorkflowStep'

type SimpleCondition = {
  parameter: string
  value: unknown
  operator: '===' | '!==' | '>' | '<' | '>=' | '<='
  expression?: '&&' | '||'
  innerExpression?: '&&' | '||'
  conditions?: SimpleCondition[]
}

export type ConditionWorkflowStepMetadata = Array<SimpleCondition>

const valueToExpression = (value: unknown): unknown =>
  typeof value === 'string' ? `'${value}'` : value

const buildConditionEval = ({
  condition,
  workflowData,
}: {
  condition: SimpleCondition
  workflowData: unknown
}): string => {
  const conditionExpression = condition.expression || ''

  const leftValue = valueToExpression(workflowData[condition.parameter])
  const rightValue = valueToExpression(condition.value)

  const innerExpression =
    condition.conditions?.reduce((e, c) => {
      const ce = buildConditionEval({ condition: c, workflowData })

      return `${e} ${ce}`
    }, '') || ''

  const innerExpressionValue = innerExpression
    ? `${condition.innerExpression} (${innerExpression}) `
    : ''

  return `(${leftValue} ${condition.operator} ${rightValue} ${innerExpressionValue}) ${conditionExpression}`
}

export class ConditionWorkflowStep extends WorkflowStep<ConditionWorkflowStepMetadata> {
  public async execute({ workflowData }: WorkflowExecuteOptions): Promise<boolean> {
    const expression =
      this.metadata?.reduce((e, condition) => {
        const conditionExpression = buildConditionEval({ condition, workflowData })

        return `${e} ${conditionExpression}`
      }, '') || ''

    // eslint-disable-next-line no-eval
    return eval(expression) === true
  }
}
