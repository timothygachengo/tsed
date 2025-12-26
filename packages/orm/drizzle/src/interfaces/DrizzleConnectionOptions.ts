import type {Logger} from "drizzle-orm";
import {DrizzleBetterSQLite3DatabaseConfig} from "drizzle-orm/better-sqlite3";
import {AnyMySql2Connection} from "drizzle-orm/mysql2";
import {NodePgDatabase} from "drizzle-orm/node-postgres";

/**
 * Base configuration shared by all database connections
 */
export interface DrizzleBaseOptions {
  /**
   * Unique identifier for the connection
   * @default "default"
   */
  id?: string;

  /**
   * Schema definition for the database
   * Can be imported from your schema file
   */
  schema?: Record<string, unknown>;

  /**
   * Custom logger for Drizzle queries
   */
  logger?: boolean | Logger;
}

/**
 * PostgreSQL connection options using node-postgres (pg)
 */
export interface DrizzlePostgresOptions extends DrizzleBaseOptions {
  dialect: "postgres";
  /**
   * Pool or PoolClient instance from 'pg' package, or connection string
   */
  connection: (NodePgDatabase & {client: any}) | string;
}

/**
 * MySQL connection options using mysql2
 */
export interface DrizzleMysqlOptions extends DrizzleBaseOptions {
  dialect: "mysql";
  /**
   * Pool or Connection instance from 'mysql2' package, or connection config
   */
  connection: AnyMySql2Connection | string;
}

/**
 * SQLite connection options using better-sqlite3
 */
export interface DrizzleSqliteOptions extends DrizzleBaseOptions {
  dialect: "sqlite";
  /**
   * Database instance from 'better-sqlite3' package
   */
  connection: DrizzleBetterSQLite3DatabaseConfig | string;
}

/**
 * Discriminated union of all supported Drizzle connection options
 */
export type DrizzleConnectionOptions = DrizzlePostgresOptions | DrizzleMysqlOptions | DrizzleSqliteOptions;
