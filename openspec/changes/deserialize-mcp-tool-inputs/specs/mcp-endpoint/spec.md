## MODIFIED Requirements

### Requirement: Functional MCP APIs

`defineTool()` SHALL deserialize `tools/call` arguments with `@tsed/json-mapper` before invoking the handler when `inputSchema` comes from a Ts.ED model schema.

#### Scenario: Functional tool uses a derived Ts.ED model schema

- **WHEN** a developer registers a tool with `defineTool({ inputSchema: from(KnowledgeSearchRequest).omit("type"), handler })`
- **AND** the MCP client sends aliased keys such as `top_k`, `score_threshold`, or `request_id`
- **THEN** the handler receives a `KnowledgeSearchRequest` instance
- **AND** aliased payload keys are mapped back to the model properties declared with `@Name()`
- **AND** omitted properties stay absent from the materialized input unless explicitly sent

### Requirement: Decorator-based MCP registration

Tools declared with `@Tool()` SHALL deserialize their first input argument with `@tsed/json-mapper` using the Ts.ED parameter metadata before invoking the decorated method.

#### Scenario: Decorated tool uses aliased Ts.ED properties

- **WHEN** a service method is decorated with `@Tool()` and its first parameter is a Ts.ED model using `@Name("request_id")`
- **AND** the MCP client sends `request_id` in the arguments payload
- **THEN** the method receives an instance of the declared model
- **AND** the instance exposes the mapped property name (`requestId`) to the method body
