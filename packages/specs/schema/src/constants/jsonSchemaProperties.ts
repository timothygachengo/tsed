/**
 * JSON Schema properties for composition keywords (oneOf, allOf, anyOf).
 *
 * These properties define schema composition, allowing multiple schemas to be
 * combined using different logical operators.
 *
 * @public
 */
export const MANY_OF_PROPERTIES = ["oneOf", "allOf", "anyOf"];

/**
 * JSON Schema properties specific to string type validation.
 *
 * These properties control string length constraints, pattern matching,
 * and format validation (e.g., email, uri, date-time).
 *
 * @public
 */
export const STRING_PROPERTIES = ["minLength", "maxLength", "pattern", "format"];

/**
 * JSON Schema properties specific to boolean type validation.
 *
 * Currently empty as boolean types have no specific validation properties
 * beyond the type itself.
 *
 * @public
 */
export const BOOLEAN_PROPERTIES = [];

/**
 * JSON Schema properties specific to number and integer type validation.
 *
 * These properties control numeric range constraints and divisibility rules.
 *
 * @public
 */
export const NUMBER_PROPERTIES = ["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf"];

/**
 * JSON Schema properties specific to array type validation.
 *
 * These properties control array size constraints, uniqueness requirements,
 * item schemas, and containment rules.
 *
 * @public
 */
export const ARRAY_PROPERTIES = ["maxItems", "minItems", "uniqueItems", "items", "contains", "maxContains", "minContains"];

/**
 * JSON Schema properties specific to object type validation.
 *
 * These properties control object property constraints, pattern-based properties,
 * and property dependencies.
 *
 * @public
 */
export const OBJECT_PROPERTIES = [
  "maxItems",
  "minItems",
  "uniqueItems",
  "items",
  "contains",
  "maxContains",
  "minContains",
  "patternProperties",
  "dependencies"
];

/**
 * JSON Schema properties common to all types.
 *
 * These properties can be applied to any schema regardless of its type,
 * defining constant values or enumerated options.
 *
 * @public
 */
export const COMMON_PROPERTIES = ["const", "enum"];
