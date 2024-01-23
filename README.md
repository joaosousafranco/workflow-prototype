# Workflow Automation Prototype

## High level architecture

<img title="High level architecture" alt="High level architecture" src="/docs/workflow-prototype.png">

## Usage

- Start redis instance

```sh
cd database
docker-compose up 
```

- Start incident management

```sh
cd packages/incident-management
npm run start:dev
```

- Start workflow manager

```sh
cd packages/workflow-manager
npm run start:dev
```

- Start workflow node

```sh
cd packages/workflow-node
npm run start
```

- Create a simple workflow

```sh
curl -v http://localhost:3000/api/tenant/123/workflow -X POST -d '{"name":"test1","event":"incident.created","initialStep":{"name":"LogWorkflowStep"}}'
```

- Update existent workflow with a complex scenario using conditions

```sh
curl -v http://localhost:3000/api/tenant/123/workflow -X PUT -d '{"name":"test1","tenantId":"123","id":"1","event":"incident.created","initialStep":{"name":"LogWorkflowStep","metadata":{"prefix":"Starting"},"truthyNextStep":{"name":"ConditionWorkflowStep","metadata":[{"parameter":"country","value":"Portugal","operator":"===","expression":"&&","innerExpression":"&&","conditions":[{"parameter":"name","value":"test","operator":"===","expression":"||","innerExpression":"&&","conditions":[{"parameter":"alertLevel","value":"1","operator":"==="}]},{"parameter":"name","value":"test1","operator":"==="}]},{"parameter":"alertLevel","value":"1","operator":"==="}],"truthyNextStep":{"name":"LogWorkflowStep","metadata":{"prefix":"Yes it is Portugal"}},"falsyNextStep":{"name":"LogWorkflowStep","metadata":{"prefix":"It is not Portugal"}}}}}'
```

- Create an incident using the incident-management, to do this you have to access it in the browser with the following link <http://localhost:3001>

## Notes

There are some improvements that could be added to this prototype, but the goal of this prototype
is to proof the system design that can be found in the `/docs` folder

### Global

- Error handling is missing, still a library to support error matching was added
- Proper logging is not present for simplicity but console.log can be used
- Lack of UI testing, because UI is not the goal of this prototype

### Workflow node

- Eval is being used just for implementation simplicity
