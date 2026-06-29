## Context

`defineTool()` convertit déjà le `JsonSchema` Ts.ED en schéma Zod pour l'exposition MCP, mais il ne réutilise pas ce metadata pour remapper les arguments entrants. Le metadata Ts.ED existe pourtant dans deux cas:

- schéma fonctionnel construit depuis un model, par exemple `from(KnowledgeSearchRequest).omit("type")`
- metadata du premier paramètre quand le tool est déclaré via `@Tool()`

Le besoin principal est de faire converger ces deux chemins sur le même comportement runtime.

## Goals / Non-Goals

**Goals:**

- Désérialiser les arguments avec `@tsed/json-mapper` quand `inputSchema` est un `JsonSchema` Ts.ED adossé à un model.
- Préserver le mapping des alias `@Name()` et les valeurs par défaut du model.
- Utiliser le metadata de paramètre decorator quand il est disponible pour rester cohérent avec Ts.ED.

**Non-Goals:**

- Changer le comportement des tools qui déclarent un schéma Zod ou un schéma non Ts.ED.
- Ajouter une validation métier supplémentaire au-delà de ce que MCP et Ts.ED font déjà.

## Decisions

- Désérialiser dans le wrapper runtime de `defineTool()`, juste avant l'appel du handler.
  Rationale: un seul point couvre l'API fonctionnelle et le mode decorator.
  Alternative rejetée: désérialiser seulement dans `@Tool()`, car cela laisserait l'API fonctionnelle incohérente.

- Propager le `JsonEntityStore` du paramètre decorator jusqu'au wrapper quand il existe.
  Rationale: `@tsed/json-mapper` sait mieux désérialiser avec un `store` qu'avec un type seul.
  Alternative rejetée: se baser uniquement sur `schema.getTarget()`, suffisant pour `from(Model)` mais plus faible pour le metadata decorator.

- Désérialiser uniquement quand le target Ts.ED correspond à une vraie classe métier.
  Rationale: éviter de transformer les schémas génériques/objets simples qui ne portent pas d'intention de model.
  Alternative rejetée: désérialiser tous les `JsonSchema`, ce qui changerait inutilement le comportement des schémas objets anonymes.

## Risks / Trade-offs

- [Ajout d'une peer dependency] → Mitigation: suivre le pattern des autres packages Ts.ED qui importent `@tsed/json-mapper`.
- [Comportement changé pour certains handlers existants] → Mitigation: limiter la désérialisation aux schémas Ts.ED avec target de classe et couvrir les cas par tests.
- [Metadata partiel pour `omit/pick/partial`] → Mitigation: s'appuyer sur `JsonSchema.clone()` qui conserve `target` et alias dans Ts.ED.

## Migration Plan

- Ajouter la dépendance package.
- Brancher la désérialisation dans `defineTool()`.
- Couvrir par tests unitaires les chemins fonctionnel et decorator.
- Valider avec la suite `@tsed/platform-mcp`.

## Open Questions

- Aucun pour ce scope.
