import {from} from "./from.js";

/**
 * Create a string schema programmatically.
 *
 * This function provides a fluent API for building string schemas without decorators.
 * It returns a JsonSchema instance configured for string type, which can be further
 * customized with validation constraints, formats, and other JSON Schema properties.
 *
 * ### Usage
 *
 * ```typescript
 * import {string} from "@tsed/schema";
 *
 * // Basic string schema
 * const nameSchema = string();
 *
 * // String with constraints
 * const emailSchema = string()
 *   .format("email")
 *   .minLength(5)
 *   .maxLength(100)
 *   .description("User email address");
 *
 * // String with pattern
 * const phoneSchema = string()
 *   .pattern(/^\d{3}-\d{3}-\d{4}$/)
 *   .description("Phone number in format: 123-456-7890");
 *
 * // Enum string
 * const statusSchema = string()
 *   .enum("active", "inactive", "pending");
 * ```
 *
 * ### Available Methods
 *
 * The returned JsonSchema provides many chainable methods:
 * - `minLength(n)` / `maxLength(n)` - Length constraints
 * - `pattern(regex)` - Pattern matching
 * - `format(type)` - Format validation (email, uri, date-time, etc.)
 * - `enum(...values)` - Restrict to specific values
 * - `description(text)` - Add description
 * - `default(value)` - Set default value
 * - `nullable()` - Allow null values
 *
 * @returns A new JsonSchema configured as a string type
 *
 * @public
 */
export function string() {
  return from(String);
}
