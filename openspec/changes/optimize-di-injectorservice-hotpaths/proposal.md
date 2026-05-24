## Why

`@tsed/di` already has strong correctness and coverage, but `InjectorService` and `Container` still do avoidable work on hot paths and bootstrap paths. These costs increase startup time and allocation pressure in large apps with many providers.

The current behavior must stay backward compatible (scopes, async factories, lifecycle hooks, import overrides), so we need a targeted optimization pass focused on low-risk internals first.

## What Changes

- Optimize provider filtering in `Container.getProviders()` to remove O(n²)-style array reconstruction.
- Optimize `InjectorService` hot lookups and internal loops to reduce allocations without changing observable behavior.
- Simplify `resolveImportsProviders()` into a single-pass transform to reduce bootstrap overhead.
- Add regression-focused tests for optimized paths to guarantee compatibility with current DI semantics.
- Document deferred/high-risk optimizations (lazy singleton bootstrap and invoke-plan caching) for a later change.

## Capabilities

### New Capabilities

- `di-injector-performance`: Improves internal runtime efficiency of DI resolution and bootstrap while preserving existing API behavior.

### Modified Capabilities

<!-- No requirement-level behavior changes for existing capabilities. -->

## Impact

- Affected code: `packages/di/src/common/services/InjectorService.ts`, `packages/di/src/common/domain/Container.ts`, and related tests.
- APIs: no public API change expected.
- Runtime: lower allocation pressure and faster resolution/bootstrap in provider-heavy applications.
- Risk: medium-low, limited to internal algorithm changes guarded by existing and new tests.
