import {Inject, Injectable} from "@tsed/di";
import {Logger} from "@tsed/logger";

/**
 * Service to manage Drizzle ORM database connections
 * Supports multiple database connections with different dialects
 */
@Injectable()
export class DrizzleService {
  /**
   * Map of all registered database connections
   * Key is the connection id, value is the Drizzle database instance
   */
  readonly connections: Map<string, any> = new Map();

  private defaultConnection: string = "default";

  @Inject()
  logger: Logger;

  /**
   * Create and register a new database connection
   *
   * @param id - Unique identifier for the connection
   * @param db - Drizzle database instance
   * @param isDefault - Whether this should be the default connection
   * @returns The registered database instance
   */
  async connect(id: string, db: any, isDefault = false): Promise<any> {
    if (this.has(id)) {
      return this.get(id)!;
    }

    this.logger.info(`Register Drizzle connection: ${id}`);

    this.connections.set(id, db);

    if (id === "default" || isDefault) {
      this.defaultConnection = id;
    }

    return db;
  }

  /**
   * Get a database connection by id
   *
   * @param id - Connection identifier. If not provided, returns the default connection
   * @returns The Drizzle database instance or undefined
   */
  get(id?: string): any | undefined {
    return this.connections.get(id || this.defaultConnection);
  }

  /**
   * Check if a connection exists
   *
   * @param id - Connection identifier. If not provided, checks the default connection
   * @returns True if the connection exists
   */
  has(id?: string): boolean {
    return this.connections.has(id || this.defaultConnection);
  }

  /**
   * Close all database connections
   * Called during application shutdown
   */
  async closeConnections(): Promise<void> {
    for (const [id, connection] of this.connections.entries()) {
      this.logger.info(`Closing Drizzle connection: ${id}`);

      // Some database clients have a close/end method
      if (connection.$client && typeof connection.$client.end === "function") {
        await connection.$client.end();
      } else if (connection.$client && typeof connection.$client.close === "function") {
        await connection.$client.close();
      }

      this.connections.delete(id);
    }
  }
}
