import {AnyJsonSchema} from "../../domain/JsonSchema.js";
import {JsonEntityFn} from "./jsonEntityFn.js";

/**
 * Controls whether additional properties beyond those defined in the schema are allowed.
 *
 * By default, JSON Schema validation may allow properties not explicitly defined in the schema.
 * This decorator lets you control that behavior either by disabling additional properties entirely
 * or by specifying a schema that additional properties must conform to.
 *
 * ### Usage with boolean
 *
 * ```typescript
 * // Disallow any additional properties
 * @AdditionalProperties(false)
 * class StrictModel {
 *   @Property()
 *   name: string;
 *   // Any other properties will cause validation errors
 * }
 *
 * // Explicitly allow additional properties (default behavior)
 * @AdditionalProperties(true)
 * class FlexibleModel {
 *   @Property()
 *   name: string;
 *   // Additional properties are allowed
 * }
 * ```
 *
 * ### Usage with schema
 *
 * ```typescript
 * // Additional properties must be strings
 * @AdditionalProperties({ type: "string" })
 * class DynamicModel {
 *   @Property()
 *   id: number;
 *   // Other properties must be strings
 * }
 *
 * // Additional properties must match a complex schema
 * @AdditionalProperties({
 *   type: "object",
 *   properties: {
 *     value: { type: "string" }
 *   }
 * })
 * class MetadataModel {
 *   @Property()
 *   name: string;
 *   // Additional properties must be objects with a 'value' string property
 * }
 * ```
 *
 * ### Common Use Cases
 *
 * - **Strict APIs**: Use `@AdditionalProperties(false)` to ensure clients only send expected fields
 * - **Dynamic Data**: Use with a schema to validate dynamic property values
 * - **Migration**: Allow additional properties during API versioning transitions
 *
 * @param schema - Boolean to allow/disallow additional properties, or a schema they must match
 *
 * @decorator
 * @validation
 * @public
 */
export function AdditionalProperties(schema: boolean | AnyJsonSchema) {
  return JsonEntityFn((entity, parameters) => {
    entity.itemSchema.additionalProperties(schema);
  });
}
