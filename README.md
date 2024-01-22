# Workflow Automation Prototype

```sh
curl -v http://localhost:3000/api/tenant/123/workflow -X POST -d '{"name":"test1","event":"incident.created","initialStep":{"name":"LogWorkflowStep"}}'
curl -v http://localhost:3000/api/tenant/123/workflow -X PUT -d '{"name":"test1","tenantId":"123","id":"1","event":"incident.created","initialStep":{"name":"LogWorkflowStep","truthyNextStep":{"name":"LogWorkflowStep"}}}'
```
