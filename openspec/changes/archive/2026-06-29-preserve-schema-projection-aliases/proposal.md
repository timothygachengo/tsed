## Why

Les projections `JsonSchema` basées sur `clone()` perdent actuellement les alias déclarés sur le schéma source. En pratique, `from(KnowledgeSearchRequest).omit("type")` n'expose plus `top_k`, `score_threshold` ou `request_id`, et le même problème doit être évité pour `.partial()`.

## What Changes

- Corriger la copie des alias lors du clonage d'un `JsonSchema`.
- Garantir que `.omit()` et `.partial()` conservent les alias du schéma source.
- Ajouter des tests de non-régression couvrant les projections sur un model Ts.ED aliasé.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `object-projections`: les projections `JsonSchema` qui reposent sur un clone doivent préserver les alias déclarés sur le schéma source.

## Impact

- Code affecté: `packages/specs/schema/src/domain/JsonSchema.ts`
- Tests affectés: `packages/specs/schema/src/domain/JsonSchema.spec.ts`
- API comportementale: `.omit()` et `.partial()` conservent les noms aliasés dans le JSON Schema généré.
