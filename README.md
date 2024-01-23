# Workflow Automation Prototype

```sh
curl -v http://localhost:3000/api/tenant/123/workflow -X POST -d '{"name":"test1","event":"incident.created","initialStep":{"name":"LogWorkflowStep"}}'
curl -v http://localhost:3000/api/tenant/123/workflow -X PUT -d '{"name":"test1","tenantId":"123","id":"1","event":"incident.created","initialStep":{"name":"LogWorkflowStep","metadata":{"prefix":"Starting"},"truthyNextStep":{"name":"ConditionWorkflowStep","metadata":[{"parameter":"country","value":"Portugal","operator":"===","expression":"&&","innerExpression":"&&","conditions":[{"parameter":"name","value":"test","operator":"===","expression":"||","innerExpression":"&&","conditions":[{"parameter":"alertLevel","value":"1","operator":"==="}]},{"parameter":"name","value":"test1","operator":"==="}]},{"parameter":"alertLevel","value":"1","operator":"==="}],"truthyNextStep":{"name":"LogWorkflowStep","metadata":{"prefix":"Yes it is Portugal"}},"falsyNextStep":{"name":"LogWorkflowStep","metadata":{"prefix":"It is not Portugal"}}}}}'
```
