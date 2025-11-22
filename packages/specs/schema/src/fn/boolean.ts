import {from} from "./from.js";

/**
 * Create a boolean schema programmatically.
 *
 * This function provides a fluent API for building boolean schemas without decorators.
 * It returns a JsonSchema instance configured for boolean type, which can be further
 * customized with descriptions, defaults, and other JSON Schema properties.
 *
 * ### Usage
 *
 * ```typescript
 * import {boolean} from "@tsed/schema";
 *
 * // Basic boolean schema
 * const activeSchema = boolean();
 *
 * // Boolean with description and default
 * const isVerifiedSchema = boolean()
 *   .description("Whether the user is verified")
 *   .default(false);
 *
 * // Required boolean
 * const termsAcceptedSchema = boolean()
 *   .description("User accepted terms and conditions")
 *   .required();
 *
 * // Nullable boolean
 * const optionalFlagSchema = boolean()
 *   .nullable()
 *   .description("Optional feature flag");
 * ```
 *
 * ### Available Methods
 *
 * The returned JsonSchema provides many chainable methods:
 * - `description(text)` - Add description
 * - `default(value)` - Set default value (true or false)
 * - `nullable()` - Allow null values
 * - `const(value)` - Restrict to a single value
 *
 * @returns A new JsonSchema configured as a boolean type
 *
 * @public
 */
export function boolean() {
  return from(Boolean);
}
