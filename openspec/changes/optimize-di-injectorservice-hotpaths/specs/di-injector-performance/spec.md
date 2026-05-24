## ADDED Requirements

### Requirement: DI hot-path optimizations preserve resolution semantics

Internal performance optimizations in DI resolution paths MUST preserve existing provider resolution semantics for singleton, request, and instance scopes.

#### Scenario: Resolve providers after hot-path optimization

- **WHEN** a provider is resolved through `InjectorService.get/resolve/invoke` after optimization changes
- **THEN** returned instances MUST match existing scope semantics and caching behavior
- **AND** dependency injection order and token resolution behavior MUST remain compatible with prior behavior

### Requirement: Provider filtering remains behavior-compatible

Optimized provider filtering in `Container.getProviders()` SHALL return the same effective provider set as before for all supported type filters.

#### Scenario: Filter providers by type

- **WHEN** consumers request providers by `ProviderType`, token, string, or string array filters
- **THEN** the resulting provider list MUST be behaviorally equivalent to pre-optimization results

### Requirement: Import override bootstrap behavior remains stable

Bootstrap-time import override processing in `InjectorService.resolveImportsProviders()` MUST retain existing override semantics.

#### Scenario: Configure provider override through imports metadata

- **WHEN** settings imports include override metadata (`useClass`, `useFactory`, `useAsyncFactory`, or `use`)
- **THEN** InjectorService MUST apply the same effective provider override behavior as before optimization

### Requirement: Lifecycle hook behavior remains unchanged

Optimization work MUST preserve lifecycle hook registration and teardown behavior for singleton and request-scoped providers.

#### Scenario: Request-scoped provider destroyed through local context

- **WHEN** a request-scoped provider registers `$onDestroy` and its `LocalsContainer` is destroyed
- **THEN** the provider's destroy hook MUST still be invoked exactly as in current behavior
