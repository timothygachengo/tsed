## Why

`@tsed/platform-mcp` expose aujourd'hui les payloads `tools/call` comme des objets bruts au handler. Quand le schéma d'entrée vient d'un model Ts.ED, les alias `@Name()` et les valeurs par défaut ne sont donc pas matérialisés côté handler, ce qui casse les cas d'usage `from(Model).omit(...)` et le mode decorator.

## What Changes

- Désérialiser les arguments d'un tool MCP avec `@tsed/json-mapper` quand `inputSchema` provient d'un model Ts.ED.
- Supporter les schémas fonctionnels dérivés d'un model, y compris `from(Model).omit(...)`.
- Supporter le même comportement pour les tools enregistrés via `@Tool()`.
- Ajouter des tests unitaires couvrant les alias `@Name()` et la matérialisation en instance.

## Capabilities

### New Capabilities

- `mcp-tool-input-deserialization`: Désérialisation automatique des arguments d'un tool MCP vers le model Ts.ED déclaré.

### Modified Capabilities

- `mcp-endpoint`: Les invocations de tools MCP utilisant un model Ts.ED doivent fournir au handler une instance désérialisée alignée sur `@tsed/json-mapper`.

## Impact

- Code affecté: `packages/platform/platform-mcp/src/fn/defineTool.ts`, tests `defineTool.spec.ts` et `tool.spec.ts`.
- Dépendances: ajout de `@tsed/json-mapper` aux dépendances de développement et peer dependencies de `@tsed/platform-mcp`.
- API comportementale: les handlers reçoivent désormais des instances Ts.ED au lieu d'objets bruts quand un model est disponible.
