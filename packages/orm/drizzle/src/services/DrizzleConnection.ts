import {isArray} from "@tsed/core";
import {Configuration, registerProvider} from "@tsed/di";

import type {DrizzleConnectionOptions} from "../interfaces/DrizzleConnectionOptions.js";
import {createDrizzleConnection} from "../utils/createConnection.js";
import {DrizzleService} from "./DrizzleService.js";

/**
 * @ignore
 */
export const DRIZZLE_CONNECTIONS = Symbol.for("DRIZZLE_CONNECTIONS");

/**
 * @ignore
 */
export type DRIZZLE_CONNECTIONS = DrizzleService;

/**
 * Map configuration options to an array of connection options
 * Handles both single connection and multiple connections
 */
function mapOptions(options: Omit<DrizzleConnectionOptions, "id"> | DrizzleConnectionOptions[]): DrizzleConnectionOptions[] {
  if (!options) {
    return [];
  }

  if (!isArray(options)) {
    // Single connection - add default id if not present
    return [
      {
        ...options,
        id: "default"
      } as DrizzleConnectionOptions
    ];
  }

  return options as DrizzleConnectionOptions[];
}

/**
 * Provider factory for Drizzle database connections
 * Reads configuration from the "drizzle" key and creates connections
 */
registerProvider({
  token: DRIZZLE_CONNECTIONS,
  injectable: false,
  deps: [Configuration, DrizzleService],
  async useAsyncFactory(configuration: Configuration, drizzleService: DrizzleService) {
    const settings = mapOptions(configuration.get<DrizzleConnectionOptions | DrizzleConnectionOptions[]>("drizzle"));

    // Get project root for finding drizzle.config
    const projectRoot = configuration.get<string>("project.root") || process.cwd();

    let isDefault = true;

    for (const current of settings) {
      try {
        // Create the Drizzle database instance (now async)
        const db = await createDrizzleConnection(current, projectRoot);

        // Register the connection with the service
        await drizzleService.connect(current.id || "default", db, isDefault);

        isDefault = false;
      } catch (error) {
        /* istanbul ignore next */
        console.error(`Failed to create Drizzle connection: ${current.id || "default"}`, error);
        throw error;
      }
    }

    return drizzleService;
  }
});
