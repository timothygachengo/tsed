## MODIFIED Requirements

### Requirement: JsonSchema exposes `.omit()` to exclude properties

Projected schemas returned by `.omit()` SHALL preserve alias metadata for every remaining property.

#### Scenario: Omitting properties keeps aliases on the derived schema

- Given a Ts.ED model schema whose properties use `@Name()` aliases such as `top_k` and `request_id`
- When `.omit("type")` is called on the schema
- Then the returned schema still serializes remaining aliased properties with their alias names
- And removed properties stay absent from both `properties` and `required`

### Requirement: JsonSchema exposes `.partial()` to mark every property optional

Projected schemas returned by `.partial()` SHALL preserve alias metadata while clearing required fields.

#### Scenario: Partial schema keeps aliases on optionalized properties

- Given a Ts.ED model schema whose properties use `@Name()` aliases such as `top_k` and `request_id`
- When `.partial()` is called
- Then the returned schema still serializes those properties with their alias names
- And the derived schema has no required fields
