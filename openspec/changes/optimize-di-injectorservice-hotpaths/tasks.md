## 1. Baseline and Scope Lock

- [x] 1.1 Record current DI baseline (`cd packages/di && yarn test`) and capture key behavior constraints from scope/request/async-factory tests.
- [x] 1.2 Enumerate hot-path methods targeted in this change (`Container.getProviders`, `InjectorService.get`, `InjectorService.resolveImportsProviders`, and related internal loops).

## 2. Low-Risk Runtime Optimizations

- [x] 2.1 Refactor `Container.getProviders()` to avoid spread-based array reconstruction in reduction and keep identical filter semantics.
- [x] 2.2 Optimize `InjectorService` cache/lookup and loop internals to reduce redundant work without changing provider resolution semantics.
- [x] 2.3 Refactor `resolveImportsProviders()` into a single-pass transformation with equivalent override behavior.

## 3. Regression Safety

- [x] 3.1 Add/adjust unit tests for optimized container/provider filtering behavior.
- [x] 3.2 Validate integration coverage for request scope lifecycle, async factory bootstrap, and import override compatibility via existing suites.
- [x] 3.3 Ensure lifecycle hook registration/teardown behavior remains unchanged after refactor.

## 4. Validation and Follow-up

- [x] 4.1 Run `cd packages/di && yarn test` and confirm all tests pass.
- [x] 4.2 Summarize before/after micro-level observations (allocation/loop simplification) in the PR/change notes.
- [x] 4.3 Document deferred high-risk optimizations (lazy singleton bootstrap, invoke-plan caching) as future OpenSpec follow-up work.
