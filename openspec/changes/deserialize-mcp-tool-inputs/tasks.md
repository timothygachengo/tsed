## 1. OpenSpec and dependencies

- [x] 1.1 Add the OpenSpec artifacts describing MCP tool input deserialization.
- [x] 1.2 Add `@tsed/json-mapper` to `@tsed/platform-mcp` package metadata using the existing Ts.ED dependency pattern.

## 2. Runtime behavior

- [x] 2.1 Update `defineTool()` to deserialize tool arguments from Ts.ED model metadata for functional registrations.
- [x] 2.2 Reuse decorator parameter metadata so `@Tool()` handlers receive deserialized model instances with alias mapping.

## 3. Validation

- [x] 3.1 Add unit tests for functional `inputSchema: from(Model).omit(...)` deserialization.
- [x] 3.2 Add unit tests for decorator-based input deserialization and run the `@tsed/platform-mcp` test suite.
