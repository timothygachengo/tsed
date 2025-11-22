### Ts.ED Hooks — JSDoc Coverage Tracker (packages/hooks/src)

Generated: 2025-11-22

Purpose

- Track documentation coverage for exported symbols in `packages/hooks/src`.
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

- Index files and tests (`*.spec.ts`) are excluded by request.
- The `@tsed/hooks` package provides a lightweight event hooks system for managing event listeners and triggering events.
- The package consists of a single main file `Hooks.ts` with the `Hooks` class and functional helper exports.

---

## Summary table (per file)

Files under `packages/hooks/src` (excluding index.ts and tests):

- [x] packages/hooks/src/Hooks.ts

---

## Per-file symbol checklist (detailed)

### packages/hooks/src/Hooks.ts

Exported symbols to document:

#### Type Aliases

- [x] `HookRef` - Type defining what can be used as a hook reference (string, symbol, Function, any)
- [x] `HookListener` - Type defining a hook listener (Function)

#### Classes

- [x] `Hooks` - Main event hooks management class

#### Constants

- [x] `hooks` - Global singleton instance of the Hooks class
- [x] `$on` - Functional helper bound to hooks.on
- [x] `$once` - Functional helper bound to hooks.once
- [x] `$off` - Functional helper bound to hooks.off
- [x] `$emit` - Functional helper bound to hooks.emit
- [x] `$asyncEmit` - Functional helper bound to hooks.asyncEmit
- [x] `$alter` - Functional helper bound to hooks.alter
- [x] `$asyncAlter` - Functional helper bound to hooks.asyncAlter

---

## Execution plan

Since this package has only one file with a focused set of exports, the documentation can be completed in a single pass:

1. Document type aliases (`HookRef`, `HookListener`)
2. Document the main `Hooks` class
3. Document the global `hooks` instance
4. Document functional helpers (`$on`, `$once`, `$off`, `$emit`, `$asyncEmit`, `$alter`, `$asyncAlter`)
5. Run `yarn api:build` to validate TSDoc compliance

### Next actions

- [x] Document type aliases in `Hooks.ts`
- [x] Document the `Hooks` class
- [x] Document exported constants and functional helpers
- [ ] Validate with `yarn api:build`

---

## Statistics

- Total files to document: 1 (excluding index.ts and tests)
- Files completed: 1
- Files in progress: 0
- Files pending: 0
- Completion: 100%

### Symbol breakdown

Total exported symbols: 11

- Type aliases: 2
- Classes: 1
- Constants/Functions: 8

#### By status

- [x] Documented: 11/11 (100%)
- [ ] Partial: 0/11 (0%)
- [ ] Pending: 0/11 (0%)

---

Last updated: 2025-11-22
