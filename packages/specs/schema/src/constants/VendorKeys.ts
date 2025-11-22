/**
 * Vendor extension keys used in JSON schemas and OpenAPI specifications.
 *
 * These keys are used as custom extension properties (prefixed with `x-` in OpenAPI)
 * to store Ts.ED-specific metadata in generated schemas. Vendor extensions enable
 * advanced features like generic type handling, group-based serialization, and
 * nullable type support.
 *
 * ### Usage
 *
 * Vendor keys are automatically added to schemas by decorators and mappers.
 * They preserve TypeScript type information and enable runtime schema transformations.
 *
 * ### Generic Type Keys
 * - GENERIC_LABELS: Labels for generic type parameters
 * - GENERIC_LABEL: Single generic type label
 * - GENERIC_OF: Generic type reference
 *
 * ### Group Keys
 * - GROUPS: Property group memberships
 * - GROUPS_NAME: Named group identifier
 * - FORWARD_GROUPS: Groups forwarded to nested properties
 * - ALLOWED_GROUPS: Groups allowed for access
 *
 * ### Type Keys
 * - NULLABLE: Marks a type as nullable
 *
 * @public
 */
export enum VendorKeys {
  GENERIC_LABELS = "genericLabels",
  GENERIC_LABEL = "genericLabel",
  GENERIC_OF = "genericOf",
  NULLABLE = "nullable",
  FORWARD_GROUPS = "forwardGroups",
  GROUPS = "groups",
  GROUPS_NAME = "groupsName",
  ALLOWED_GROUPS = "allowedGroups"
}
