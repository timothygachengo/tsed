## Context

`JsonSchema.pick()`, `.omit()`, `.partial()` et d'autres helpers projettent le schéma source en partant d'un `clone()`. Le bug observé sur `.omit()` vient du mécanisme de copie: la map interne `#alias` n'est pas recopiée depuis l'objet source. Le résultat est silencieux mais visible dès qu'un schéma dérivé doit encore produire des clés aliasées via `toJSON()` / `toObject()`.

## Goals / Non-Goals

**Goals:**

- Corriger la copie des alias dans `JsonSchema.clone()/assign()`.
- Vérifier explicitement `.omit()` et `.partial()` sur un model Ts.ED avec `@Name()`.

**Non-Goals:**

- Revoir l'ensemble des autres métadonnées internes du clone au-delà du bug alias.
- Changer la surface type-level de `.pick()`, `.omit()` ou `.partial()`.

## Decisions

- Corriger le bug au niveau de `assign()` plutôt que dans `.omit()` ou `.partial()`.
  Rationale: la perte d'alias se produit pendant le clone, donc le fix doit rester central et profiter à tous les helpers basés sur `clone()`.
  Alternative rejetée: recoller les alias dans chaque helper de projection, trop fragile et incomplet.

- Tester avec un vrai model Ts.ED décoré.
  Rationale: c'est le cas utilisateur réel et cela couvre la présence d'alias issus de `@Name()`, pas seulement des alias ajoutés à la main.

## Risks / Trade-offs

- [Le fix élargit le comportement à tous les clones] → Mitigation: le changement est cohérent avec l'intention de `clone()` et ne fait que restaurer un metadata déjà présent sur le schéma source.
- [D'autres metadata de clone peuvent aussi être erronées] → Mitigation: rester strictement sur les alias dans ce changement pour limiter le scope.
