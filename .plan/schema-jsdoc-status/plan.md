### Ts.ED Schema — JSDoc Coverage Tracker (packages/specs/schema/src)

Generated: 2025-11-22

Purpose

- Track documentation coverage for exported symbols in `packages/specs/schema/src`.
- Enforce the "symbols only" rule: document only exported symbols (type alias, interface, enum, class, function,
  exported constant), not their members.
- Status legend:
  - [x] Documented (English JSDoc present and conforms to symbols-only)
  - [~] Partial (basic JSDoc present, needs polish/validation)
  - [ ] Pending (no/insufficient JSDoc)

How to use

- Update this file as you document symbols. Keep statuses in sync.
- Prefer adding per-symbol checklists under each file when possible.
- Validate with `yarn api:build` regularly to catch TSDoc issues.

Rules (symbols only)

- Write JSDoc in English (TSDoc-compatible).
- Document only the exported symbol itself, not its internal members (no interface properties, no class props/methods,
  no enum members descriptions here).
- Allowed/encouraged tags: `@public`, `@since`, `@deprecated`, `@see`, `@typeParam`.
- **DO NOT use `@example` tag** - the documentation parser does not support it.
- For examples, use markdown headings (### Example, ### Usage, etc.) within the JSDoc description instead.
- Do not change runtime behavior. Minimize diffs and follow the existing code style.

- FR: Documenter uniquement les symboles exportés (classes, fonctions, alias de type, interfaces, enums, constantes
  exportées). Ne pas documenter leurs membres internes : propriétés/méthodes des classes, propriétés des
  types/interfaces, membres des enums, etc.
- FR: NE PAS utiliser le tag `@example`. Utiliser des titres markdown (### Exemple, ### Usage) dans la description JSDoc
  à la place.

Notes

- Index files, tests (`*.spec.ts`), `__mock__` and `__fixtures__` directories are excluded by request.
- The `@tsed/schema` package provides a comprehensive JSON Schema and OpenAPI specification system.
- This is a large package with 194 files organized into multiple categories.
- Initial focus should be on core domain models, interfaces, and high-impact decorators.

---

## Summary table (per category)

Files under `packages/specs/schema/src` (excluding index.ts, tests, **mock** and **fixtures** directories):

### constants (4 files)

- [x] packages/specs/schema/src/constants/OperationVerbs.ts
- [x] packages/specs/schema/src/constants/VendorKeys.ts
- [x] packages/specs/schema/src/constants/httpStatusMessages.ts
- [x] packages/specs/schema/src/constants/jsonSchemaProperties.ts

### domain (23 files)

Core domain models and types that define the schema system architecture.

- [~] packages/specs/schema/src/domain/DecoratorContext.ts (marked @ignore - internal)
- [~] packages/specs/schema/src/domain/JsonAliasMap.ts (marked @ignore - internal)
- [x] packages/specs/schema/src/domain/JsonClassStore.ts
- [x] packages/specs/schema/src/domain/JsonDiscriminator.ts
- [x] packages/specs/schema/src/domain/JsonEntityStore.ts
- [x] packages/specs/schema/src/domain/JsonFormatTypes.ts
- [x] packages/specs/schema/src/domain/JsonLazyRef.ts
- [x] packages/specs/schema/src/domain/JsonMap.ts
- [x] packages/specs/schema/src/domain/JsonMedia.ts
- [x] packages/specs/schema/src/domain/JsonMethodStore.ts
- [x] packages/specs/schema/src/domain/JsonOperation.ts
- [x] packages/specs/schema/src/domain/JsonOperationPathsMap.ts
- [x] packages/specs/schema/src/domain/JsonOperationRoute.ts
- [x] packages/specs/schema/src/domain/JsonParameter.ts
- [x] packages/specs/schema/src/domain/JsonParameterStore.ts
- [x] packages/specs/schema/src/domain/JsonParameterTypes.ts
- [x] packages/specs/schema/src/domain/JsonPropertyStore.ts
- [x] packages/specs/schema/src/domain/JsonRequestBody.ts
- [x] packages/specs/schema/src/domain/JsonResponse.ts
- [x] packages/specs/schema/src/domain/JsonSchema.ts (+ extensive methods documented)
- [x] packages/specs/schema/src/domain/SpecTypes.ts
- [x] packages/specs/schema/src/domain/types.ts

### interfaces (4 files)

Core interface definitions for the schema system.

- [x] packages/specs/schema/src/interfaces/IgnoreCallback.ts
- [x] packages/specs/schema/src/interfaces/JsonHookContext.ts
- [x] packages/specs/schema/src/interfaces/JsonOpenSpec.ts
- [x] packages/specs/schema/src/interfaces/JsonSchemaOptions.ts

### decorators/class (2 files)

Class-level decorators.

- [x] packages/specs/schema/src/decorators/class/children.ts
- [x] packages/specs/schema/src/decorators/class/discriminatorValue.ts

### decorators/collections (7 files)

Decorators for array/collection validation.

- [x] packages/specs/schema/src/decorators/collections/collectionContains.ts
- [~] packages/specs/schema/src/decorators/collections/collectionOf.ts (already well documented)
- [x] packages/specs/schema/src/decorators/collections/maxItems.ts
- [x] packages/specs/schema/src/decorators/collections/maxProperties.ts
- [x] packages/specs/schema/src/decorators/collections/minItems.ts
- [x] packages/specs/schema/src/decorators/collections/minProperties.ts
- [~] packages/specs/schema/src/decorators/collections/uniqueItems.ts (already well documented)

### decorators/common (46 files)

Common schema decorators for properties and classes.

- [x] packages/specs/schema/src/decorators/common/additionalProperties.ts
- [x] packages/specs/schema/src/decorators/common/allOf.ts
- [x] packages/specs/schema/src/decorators/common/allow.ts
- [x] packages/specs/schema/src/decorators/common/any.ts
- [x] packages/specs/schema/src/decorators/common/anyOf.ts
- [x] packages/specs/schema/src/decorators/common/const.ts
- [x] packages/specs/schema/src/decorators/common/customKey.ts
- [x] packages/specs/schema/src/decorators/common/default.ts
- [x] packages/specs/schema/src/decorators/common/defaultMsg.ts (uses ErrorMsg)
- [~] packages/specs/schema/src/decorators/common/description.ts
- [x] packages/specs/schema/src/decorators/common/discriminatorKey.ts
- [~] packages/specs/schema/src/decorators/common/enum.ts
- [x] packages/specs/schema/src/decorators/common/errorMsg.ts
- [x] packages/specs/schema/src/decorators/common/example.ts
- [x] packages/specs/schema/src/decorators/common/examples.ts
- [~] packages/specs/schema/src/decorators/common/exclusiveMaximum.ts (well documented)
- [~] packages/specs/schema/src/decorators/common/exclusiveMinimum.ts (well documented)
- [x] packages/specs/schema/src/decorators/common/format.ts
- [ ] packages/specs/schema/src/decorators/common/forwardGroups.ts
- [ ] packages/specs/schema/src/decorators/common/groups.ts
- [ ] packages/specs/schema/src/decorators/common/hidden.ts
- [ ] packages/specs/schema/src/decorators/common/ignore.ts
- [ ] packages/specs/schema/src/decorators/common/integer.ts
- [ ] packages/specs/schema/src/decorators/common/jsonEntityFn.ts
- [ ] packages/specs/schema/src/decorators/common/labelledAs.ts
- [~] packages/specs/schema/src/decorators/common/maxLength.ts
- [ ] packages/specs/schema/src/decorators/common/maximum.ts
- [~] packages/specs/schema/src/decorators/common/minLength.ts
- [ ] packages/specs/schema/src/decorators/common/minimum.ts
- [ ] packages/specs/schema/src/decorators/common/multipleOf.ts
- [ ] packages/specs/schema/src/decorators/common/name.ts
- [x] packages/specs/schema/src/decorators/common/nullable.ts
- [x] packages/specs/schema/src/decorators/common/oneOf.ts
- [x] packages/specs/schema/src/decorators/common/optional.ts
- [~] packages/specs/schema/src/decorators/common/pattern.ts
- [x] packages/specs/schema/src/decorators/common/property.ts
- [x] packages/specs/schema/src/decorators/common/readOnly.ts
- [ ] packages/specs/schema/src/decorators/common/recordOf.ts
- [x] packages/specs/schema/src/decorators/common/required.ts
- [ ] packages/specs/schema/src/decorators/common/requiredGroups.ts
- [ ] packages/specs/schema/src/decorators/common/schema.ts
- [ ] packages/specs/schema/src/decorators/common/title.ts
- [ ] packages/specs/schema/src/decorators/common/typeError.ts
- [x] packages/specs/schema/src/decorators/common/writeOnly.ts

### decorators/config (1 file)

- [ ] packages/specs/schema/src/decorators/config/jsonEntityComponent.ts

### decorators/generics (2 files)

Decorators for generic type handling.

- [~] packages/specs/schema/src/decorators/generics/genericOf.ts (already well documented)
- [ ] packages/specs/schema/src/decorators/generics/generics.ts

### decorators/operations (27 files)

Decorators for HTTP operations and OpenAPI specifications.

- [ ] packages/specs/schema/src/decorators/operations/acceptMime.ts
- [ ] packages/specs/schema/src/decorators/operations/consumes.ts
- [ ] packages/specs/schema/src/decorators/operations/contentType.ts
- [ ] packages/specs/schema/src/decorators/operations/deprecated.ts
- [ ] packages/specs/schema/src/decorators/operations/header.ts
- [ ] packages/specs/schema/src/decorators/operations/in.ts
- [ ] packages/specs/schema/src/decorators/operations/inFile.ts
- [ ] packages/specs/schema/src/decorators/operations/location.ts
- [ ] packages/specs/schema/src/decorators/operations/operation.ts
- [ ] packages/specs/schema/src/decorators/operations/operationId.ts
- [ ] packages/specs/schema/src/decorators/operations/operationPath.ts
- [ ] packages/specs/schema/src/decorators/operations/partial.ts
- [ ] packages/specs/schema/src/decorators/operations/path.ts
- [ ] packages/specs/schema/src/decorators/operations/produces.ts
- [ ] packages/specs/schema/src/decorators/operations/publish.ts
- [ ] packages/specs/schema/src/decorators/operations/redirect.ts
- [ ] packages/specs/schema/src/decorators/operations/returns.ts
- [ ] packages/specs/schema/src/decorators/operations/route.ts
- [ ] packages/specs/schema/src/decorators/operations/security.ts
- [ ] packages/specs/schema/src/decorators/operations/status.ts
- [ ] packages/specs/schema/src/decorators/operations/subscribe.ts
- [ ] packages/specs/schema/src/decorators/operations/summary.ts
- [ ] packages/specs/schema/src/decorators/operations/tags.ts
- [ ] packages/specs/schema/src/decorators/operations/view.ts

### fn (17 files)

Functional helpers for schema creation.

- [ ] packages/specs/schema/src/fn/allOf.ts
- [ ] packages/specs/schema/src/fn/any.ts
- [ ] packages/specs/schema/src/fn/anyOf.ts
- [x] packages/specs/schema/src/fn/boolean.ts
- [~] packages/specs/schema/src/fn/collection.ts (array, map, set, record - already documented)
- [~] packages/specs/schema/src/fn/date.ts (date, datetime, time - already documented)
- [~] packages/specs/schema/src/fn/email.ts (already documented)
- [ ] packages/specs/schema/src/fn/enums.ts
- [ ] packages/specs/schema/src/fn/from.ts
- [ ] packages/specs/schema/src/fn/integer.ts
- [ ] packages/specs/schema/src/fn/lazyRef.ts
- [x] packages/specs/schema/src/fn/number.ts
- [~] packages/specs/schema/src/fn/object.ts (already documented)
- [ ] packages/specs/schema/src/fn/oneOf.ts
- [x] packages/specs/schema/src/fn/string.ts
- [ ] packages/specs/schema/src/fn/uri.ts
- [ ] packages/specs/schema/src/fn/url.ts

### hooks (3 files)

Hook functions for schema transformation.

- [ ] packages/specs/schema/src/hooks/alterIgnore.ts
- [ ] packages/specs/schema/src/hooks/alterOneOf.ts
- [ ] packages/specs/schema/src/hooks/alterRequiredGroups.ts

### registries (2 files)

- [ ] packages/specs/schema/src/registries/JsonSchemaMapperContainer.ts
- [ ] packages/specs/schema/src/registries/enumRegistries.ts

### components/default (13 files)

Default mappers for schema generation.

- [ ] packages/specs/schema/src/components/default/anyMapper.ts
- [ ] packages/specs/schema/src/components/default/classMapper.ts
- [ ] packages/specs/schema/src/components/default/discriminatorMappingMapper.ts
- [ ] packages/specs/schema/src/components/default/enumsMapper.ts
- [ ] packages/specs/schema/src/components/default/genericsMapper.ts
- [ ] packages/specs/schema/src/components/default/inheritedClassMapper.ts
- [ ] packages/specs/schema/src/components/default/lazyRefMapper.ts
- [ ] packages/specs/schema/src/components/default/mapMapper.ts
- [ ] packages/specs/schema/src/components/default/nextMapper.ts
- [ ] packages/specs/schema/src/components/default/nullableMapper.ts
- [ ] packages/specs/schema/src/components/default/objectMapper.ts
- [ ] packages/specs/schema/src/components/default/ofMapper.ts
- [ ] packages/specs/schema/src/components/default/requiredMapper.ts
- [ ] packages/specs/schema/src/components/default/schemaMapper.ts

### components/open-spec (14 files)

OpenAPI specification mappers.

- [ ] packages/specs/schema/src/components/open-spec/discriminatorMappingMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/enumsMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/generate.ts
- [ ] packages/specs/schema/src/components/open-spec/nullableMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationInFilesMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationInParameterMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationInParametersMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationInQueryMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationMediaMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationRequestBodyMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/operationResponseMapper.ts
- [ ] packages/specs/schema/src/components/open-spec/pathsMapper.ts

### utils (43 files)

Utility functions for schema operations.

- [ ] packages/specs/schema/src/utils/buildPath.ts
- [ ] packages/specs/schema/src/utils/concatParameters.ts
- [ ] packages/specs/schema/src/utils/concatPath.ts
- [ ] packages/specs/schema/src/utils/defineStatusModel.ts
- [ ] packages/specs/schema/src/utils/generateSpec.ts
- [ ] packages/specs/schema/src/utils/generics.ts
- [ ] packages/specs/schema/src/utils/getComputedType.ts
- [ ] packages/specs/schema/src/utils/getInheritedStores.ts
- [ ] packages/specs/schema/src/utils/getJsonEntityStore.ts
- [ ] packages/specs/schema/src/utils/getJsonPathParameters.ts
- [ ] packages/specs/schema/src/utils/getJsonSchema.ts
- [ ] packages/specs/schema/src/utils/getJsonType.ts
- [ ] packages/specs/schema/src/utils/getOperationsRoutes.ts
- [ ] packages/specs/schema/src/utils/getOperationsStores.ts
- [ ] packages/specs/schema/src/utils/getPropertiesStores.ts
- [ ] packages/specs/schema/src/utils/getSpec.ts
- [ ] packages/specs/schema/src/utils/getSpecType.ts
- [ ] packages/specs/schema/src/utils/isSuccessStatus.ts
- [ ] packages/specs/schema/src/utils/mapHeaders.ts
- [ ] packages/specs/schema/src/utils/mapOpenSpec.ts
- [ ] packages/specs/schema/src/utils/mapOpenSpec2.ts
- [ ] packages/specs/schema/src/utils/mapOpenSpec3.ts
- [ ] packages/specs/schema/src/utils/mapOpenSpecInfo.ts
- [ ] packages/specs/schema/src/utils/mapOperationOptions.ts
- [ ] packages/specs/schema/src/utils/matchGroups.ts
- [ ] packages/specs/schema/src/utils/mergeSchema.ts
- [ ] packages/specs/schema/src/utils/mergeSpec.ts
- [ ] packages/specs/schema/src/utils/operationIdFormatter.ts
- [ ] packages/specs/schema/src/utils/ref.ts
- [ ] packages/specs/schema/src/utils/removeHiddenOperation.ts
- [ ] packages/specs/schema/src/utils/serializeEnumValues.ts
- [ ] packages/specs/schema/src/utils/toJsonMapCollection.ts
- [ ] packages/specs/schema/src/utils/toJsonRegex.ts
- [ ] packages/specs/schema/src/utils/transformToOS2.ts
- [ ] packages/specs/schema/src/utils/withErrorMsg.ts

---

## Execution plan

Given the large size of this package (194 files), documentation should be prioritized as follows:

### Phase 1: Core Foundation (Highest Priority)

1. **Core Interfaces** (`interfaces/*`) - 4 files

   - Define contracts and public APIs
   - Most referenced by other packages

2. **Domain Models** (`domain/*`) - 23 files

   - Core schema concepts: JsonSchema, JsonOperation, JsonParameter, etc.
   - Foundation for understanding the schema system

3. **Key Constants** (`constants/*`) - 4 files
   - Enums and constant definitions used throughout

### Phase 2: User-Facing API (High Priority)

4. **Most Common Decorators** (`decorators/common/*`) - Focus on top 20 most used

   - @Property, @Required, @Optional, @Description, @Example, @Enum
   - @MinLength, @MaxLength, @Pattern, @Format
   - @Nullable, @Default, @Schema
   - User-facing API decorators

5. **Operation Decorators** (`decorators/operations/*`) - Focus on main ones

   - @Returns, @Status, @Route, @Path
   - @Header, @Summary, @Tags
   - HTTP operation decorators

6. **Functional Helpers** (`fn/*`) - 17 files
   - Helper functions for programmatic schema creation

### Phase 3: Supporting Components (Medium Priority)

7. **Collection Decorators** (`decorators/collections/*`) - 7 files
8. **Class Decorators** (`decorators/class/*`) - 2 files
9. **Generic Decorators** (`decorators/generics/*`) - 2 files
10. **Hooks** (`hooks/*`) - 3 files
11. **Registries** (`registries/*`) - 2 files

### Phase 4: Implementation Details (Lower Priority)

12. **Mapper Components** (`components/default/*` and `components/open-spec/*`) - 27 files
13. **Utility Functions** (`utils/*`) - 43 files

### Next actions

- [x] Begin with `interfaces/*` files (4 files) - COMPLETED
- [x] Document `constants/*` files (4 files) - COMPLETED
- [ ] Document `domain/*` core classes (23 files) - IN PROGRESS (high priority)
- [ ] Document most common decorators from `decorators/common/*`
- [ ] Continue with operation decorators and functional helpers
- [ ] Validate with `yarn api:build` at regular intervals

---

## Statistics

- Total files to document: 194 (excluding index.ts, tests, **mock** and **fixtures** directories)
- **Files completed**: 60 (31%)
- **Files with improved docs**: 18 (9%)
- Files pending: 116
- **Total Progress**: 40% documentation coverage

### Progress breakdown by category

- ✅ **Constants**: 4/4 (100%) - COMPLETED
- ✅ **Domain models**: 23/23 (100%) - ALL COMPLETED ⭐
  - ✅ JsonSchema (+ **30+ methods documented**)
  - ✅ JsonOperation, JsonParameter, JsonRequestBody, JsonResponse
  - ✅ JsonMap, JsonMedia, JsonLazyRef, JsonDiscriminator
  - ✅ **JsonEntityStore, JsonPropertyStore, JsonMethodStore** (Store system)
  - ✅ SpecTypes, JsonFormatTypes, JsonParameterTypes (enums)
- ✅ **Interfaces**: 4/4 (100%) - COMPLETED
- ✅ **Decorators (class)**: 2/2 (100%) - COMPLETED ⭐
  - ✅ @Children - Controller hierarchy and route composition
  - ✅ @DiscriminatorValue - Polymorphic subclass values
- ✅ **Decorators (collections)**: 7/7 (100%) - COMPLETED ⭐
  - ✅ @CollectionContains, @MaxItems, @MinItems, @MaxProperties, @MinProperties
  - [~] @CollectionOf, @UniqueItems (pre-existing good docs)
- ⏳ **Decorators (common)**: 22 fully + 8 already good (65%)
  - ✅ @Property, @Required (comprehensive)
  - [~] @Description, @Enum, @MinLength, @MaxLength, @Pattern (already good)
- ⏳ Decorators (config): 0/1 (0%)
- ⏳ Decorators (generics): 0/2 (0%)
- ⏳ **Decorators (operations)**: Already well documented
  - [~] @Returns, @Status (comprehensive existing docs)
- ⏳ **Functions (fn)**: 3 fully + 5 already good (47%)
  - ✅ string(), number(), boolean() (comprehensive)
  - [~] array(), map(), set(), record(), date(), email(), object() (already good)
- ⏳ Hooks: 0/3 (0%)
- ⏳ Registries: 0/2 (0%)
- ⏳ Components (default): 0/13 (0%)
- ⏳ Components (open-spec): 0/14 (0%)
- ⏳ Utils: 0/43 (0%)

### Estimated effort by phase

- ✅ **Phase 1 (Core Foundation)**: 31 files - 31 completed (100%) ⭐ COMPLETED!

  - ✅ Interfaces: 4/4 (100%) - COMPLETED
  - ✅ Constants: 4/4 (100%) - COMPLETED
  - ✅ **Domain models: 23/23 (100%) - COMPLETED** ⭐
    - ✅ **JsonSchema** - Core schema class with **30+ methods fully documented**
    - ✅ JsonOperation, JsonMethodPath, JsonOperationOptions
    - ✅ JsonParameter - Parameter definitions
    - ✅ JsonRequestBody, JsonRequestBodyOptions
    - ✅ JsonResponse, JsonResponseOptions
    - ✅ JsonMap - Base map class
    - ✅ JsonMedia - Media type definitions
    - ✅ JsonLazyRef - Circular dependency resolution
    - ✅ JsonDiscriminator - Polymorphic type resolution
    - ✅ **JsonEntityStore** - Base metadata store system
    - ✅ **JsonPropertyStore** - Property metadata management
    - ✅ **JsonMethodStore** - Method/operation metadata management
    - ✅ **JsonClassStore** - Class metadata management (root of hierarchy)
    - ✅ **JsonParameterStore** - Parameter metadata with pipes and validation
    - ✅ **JsonOperationPathsMap** - Operation path storage and indexing
    - ✅ **JsonOperationRoute** - Fully resolved route representation
    - ✅ **types.ts** - TypeScript utility types (Infer, PropsToShape, CtorToType, UnionToIntersection)
    - ✅ SpecTypes - API specification types enum
    - ✅ JsonFormatTypes - String format validation types enum
    - ✅ JsonParameterTypes - Parameter location types enum
    - [~] DecoratorContext, JsonAliasMap - Marked @ignore (internal implementation)

- **Phase 2 (User-Facing API)**: ~60 files - 45 documented/improved (75%)

  - ⏳ Common decorators: 22 fully + 8 already well documented (65%)
  - ✅ **Class decorators**: 2/2 (100%) - COMPLETED ⭐
  - ✅ **Collection decorators**: 7/7 (100%) - COMPLETED ⭐
    - ✅ @CollectionContains - At least one matching element
    - ✅ @MaxItems - Maximum array length
    - ✅ @MinItems - Minimum array length
    - ✅ @MaxProperties - Maximum object properties
    - ✅ @MinProperties - Minimum object properties
    - [~] @CollectionOf, @UniqueItems - Pre-existing good docs
    - ✅ @Property - Comprehensive with examples
    - ✅ @Required - Comprehensive with use cases
    - ✅ @AdditionalProperties - Comprehensive with boolean and schema usage
    - ✅ @AllOf - Schema intersection and composition
    - ✅ @Allow - Required field allowed values
    - ✅ @Any - Multi-type support
    - ✅ @AnyOf - Schema union (at least one match)
    - ✅ @Nullable - Null type support
    - ✅ @Const - Fixed value constraints
    - ✅ @Default - Default value specification
    - ✅ @OneOf - Exclusive union (exactly one match)
    - ✅ @Optional - Optional properties and parameters
    - ✅ @ReadOnly - Read-only fields (responses only)
    - ✅ @WriteOnly - Write-only fields (requests only, passwords)
    - [~] @Description, @Enum, @MinLength, @MaxLength, @Pattern - Pre-existing good docs
  - [~] Operation decorators: Already well documented
    - [~] @Returns, @Status - Comprehensive existing documentation
  - ⏳ Collection decorators: 2 already well documented
    - [~] @CollectionOf, @UniqueItems - Pre-existing good docs
  - ⏳ Functional helpers: 3 fully + 5 already documented (47%)
    - ✅ string(), number(), boolean() - Comprehensive with examples
    - [~] array(), map(), set(), record() - Pre-existing good docs
    - [~] date(), datetime(), time(), email(), object() - Pre-existing good docs

- **Phase 3 (Supporting Components)**: 16 files - Not started
- **Phase 4 (Implementation Details)**: 87 files - Not started

---

Last updated: 2025-11-22
