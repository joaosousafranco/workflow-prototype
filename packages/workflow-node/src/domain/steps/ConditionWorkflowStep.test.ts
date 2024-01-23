import {
  ConditionWorkflowStep,
  ConditionWorkflowStepMetadata,
} from './ConditionWorkflowStep'

describe('ConditionWorkflowStep', () => {
  describe('#execute', () => {
    it('should return true', async () => {
      const workflowData: ConditionWorkflowStepMetadata = [
        {
          parameter: 'country',
          value: 'Portugal',
          operator: '===',
          expression: '&&',
          innerExpression: '&&',
          conditions: [
            {
              parameter: 'name',
              value: 'test',
              operator: '===',
              expression: '||',
              innerExpression: '&&',
              conditions: [
                {
                  parameter: 'alertLevel',
                  value: '1',
                  operator: '===',
                },
              ],
            },
            {
              parameter: 'name',
              value: 'test1',
              operator: '===',
            },
          ],
        },
        {
          parameter: 'alertLevel',
          value: '1',
          operator: '===',
          expression: '&&',
        },
        {
          parameter: 'foo',
          value: true,
          operator: '===',
          expression: '&&',
        },
        {
          parameter: 'bar',
          value: 2,
          operator: '>',
        },
      ]

      const step = new ConditionWorkflowStep({ metadata: workflowData })

      const result = await step.execute({
        workflow: undefined,
        workflowData: {
          country: 'Portugal',
          alertLevel: '1',
          name: 'test',
          foo: true,
          bar: 3,
        },
      })

      expect(result).toEqual(true)
    })

    it('should return false', async () => {
      const workflowData: ConditionWorkflowStepMetadata = [
        {
          parameter: 'country',
          value: 'Portugal',
          operator: '===',
        },
      ]

      const step = new ConditionWorkflowStep({ metadata: workflowData })

      const result = await step.execute({
        workflow: undefined,
        workflowData: {
          country: 'USA',
        },
      })

      expect(result).toEqual(false)
    })
  })
})
