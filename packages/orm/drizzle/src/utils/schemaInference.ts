/**
 * Infer and merge schema from multiple sources
 * Combines all table definitions from provided schema objects
 *
 * @param schemas - Array of schema objects or a single schema object
 * @returns Merged schema object
 */
export function inferSchema(...schemas: Array<Record<string, unknown> | undefined>): Record<string, unknown> | undefined {
  const validSchemas = schemas.filter((s): s is Record<string, unknown> => s !== undefined && s !== null);

  if (validSchemas.length === 0) {
    return undefined;
  }

  if (validSchemas.length === 1) {
    return validSchemas[0];
  }

  // Merge multiple schemas into one
  return validSchemas.reduce((merged, current) => {
    return {...merged, ...current};
  }, {});
}

/**
 * Extract schema from a module that may export it in different ways
 * Handles: export * from "./schema", export {schema}, export default schema
 *
 * @param module - Imported module object
 * @returns Extracted schema object
 */
export function extractSchemaFromModule(module: any): Record<string, unknown> | undefined {
  if (!module) {
    return undefined;
  }

  // If module is already a plain object with table definitions, use it directly
  if (isSchemaObject(module)) {
    return module;
  }

  // Check for default export
  if (module.default && isSchemaObject(module.default)) {
    return module.default;
  }

  // Check for named exports (filter out non-table exports)
  const schemaExports: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(module)) {
    if (key === "default" || key === "__esModule") {
      continue;
    }
    // Include if it looks like a Drizzle table
    if (value && typeof value === "object" && isDrizzleTable(value)) {
      schemaExports[key] = value;
    }
  }

  return Object.keys(schemaExports).length > 0 ? schemaExports : undefined;
}

/**
 * Check if an object looks like a schema object (has table definitions)
 */
function isSchemaObject(obj: any): obj is Record<string, unknown> {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  // Check if at least one property looks like a Drizzle table
  return Object.values(obj).some((value) => isDrizzleTable(value));
}

/**
 * Check if a value looks like a Drizzle table definition
 * Drizzle tables typically have specific properties like Symbol(Name), Symbol(Columns), etc.
 */
function isDrizzleTable(value: any): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  // Check for common Drizzle table markers
  const symbols = Object.getOwnPropertySymbols(value);
  const hasTableSymbols = symbols.some((sym) => {
    const symString = sym.toString();
    return symString.includes("Name") || symString.includes("Columns") || symString.includes("Table") || symString.includes("BaseName");
  });

  // Also check for common table properties
  const hasTableProps =
    value[Symbol.for("drizzle:Name")] ||
    value[Symbol.for("drizzle:Columns")] ||
    (typeof value.getSQL === "function" && typeof value.mapWith === "function");

  return hasTableSymbols || hasTableProps;
}
