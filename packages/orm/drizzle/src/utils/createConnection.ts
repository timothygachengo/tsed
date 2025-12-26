import {drizzle as drizzleSqlite} from "drizzle-orm/better-sqlite3";
import {drizzle as drizzleMysql} from "drizzle-orm/mysql2";
import {drizzle as drizzlePostgres} from "drizzle-orm/node-postgres";

import type {DrizzleConnectionOptions} from "../interfaces/DrizzleConnectionOptions.js";
import {findDrizzleConfig, loadDrizzleConfig} from "./configLoader.js";
import {extractSchemaFromModule, inferSchema} from "./schemaInference.js";

/**
 * Create a Drizzle database instance based on the dialect
 *
 * @param options - Connection configuration
 * @param projectRoot - Root directory of the project (for finding drizzle.config)
 * @returns Drizzle database instance
 */
export async function createDrizzleConnection<T extends DrizzleConnectionOptions>(
  options: T,
  projectRoot?: string
): Promise<
  T["dialect"] extends "postgres"
    ? ReturnType<typeof drizzlePostgres>
    : T["dialect"] extends "mysql"
      ? ReturnType<typeof drizzleMysql>
      : T["dialect"] extends "sqlite"
        ? ReturnType<typeof drizzleSqlite>
        : never
> {
  const {dialect, connection, logger} = options;
  let {schema} = options;

  // Check for drizzle.config file and load schema from it if not provided
  if (!schema) {
    const configPath = findDrizzleConfig(projectRoot);
    if (configPath) {
      const config = await loadDrizzleConfig(configPath);
      if (config?.schema) {
        // If config.schema is a string path, try to load it
        if (typeof config.schema === "string") {
          try {
            const schemaModule = await import(config.schema);
            schema = extractSchemaFromModule(schemaModule);
          } catch (error) {
            console.warn(`Failed to load schema from ${config.schema}:`, error);
          }
        } else if (typeof config.schema === "object") {
          schema = extractSchemaFromModule(config.schema);
        }
      }
    }
  }

  // Infer schema if it's provided as multiple modules
  const finalSchema = inferSchema(schema);

  switch (dialect) {
    case "postgres": {
      // For node-postgres (pg)
      // Supports: Pool, PoolClient, or connection string
      return drizzlePostgres(connection, {schema: finalSchema, logger}) as any;
    }

    case "mysql": {
      // For mysql2
      // Supports: Pool, Connection, or connection config
      return drizzleMysql(connection, {schema: finalSchema, logger, mode: "default"}) as any;
    }

    case "sqlite": {
      // For better-sqlite3
      // Requires: Database instance
      return drizzleSqlite(connection, {schema: finalSchema, logger}) as any;
    }

    default: {
      // Type narrowing ensures this should never happen
      const exhaustiveCheck: never = dialect;
      throw new Error(
        `Unsupported database dialect: ${exhaustiveCheck}. Supported dialects: postgres, mysql, sqlite. Other dialects coming soon!`
      );
    }
  }
}

const supportedDialects = ["postgres", "mysql", "sqlite"];

export {supportedDialects};
