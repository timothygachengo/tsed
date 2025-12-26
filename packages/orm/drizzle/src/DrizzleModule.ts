import {Configuration, OnInit} from "@tsed/di";
import {Module, OnDestroy} from "@tsed/di";

import {DRIZZLE_CONNECTIONS} from "./services/DrizzleConnection.js";
import {DrizzleService} from "./services/DrizzleService.js";

/**
 * Drizzle ORM module for Ts.ED
 *
 * @example
 * ```typescript
 * import {Configuration} from "@tsed/di";
 * import {DrizzleModule} from "@tsed/drizzle";
 *
 * @Configuration({
 *   imports: [DrizzleModule],
 *   drizzle: {
 *     dialect: "postgres",
 *     connection: process.env.DATABASE_URL,
 *     schema: * as schema, // Your schema
 *     logger: true
 *   }
 * })
 * export class Server {}
 * ```
 */
@Module({
  imports: [DRIZZLE_CONNECTIONS]
})
export class DrizzleModule implements OnDestroy, OnInit {
  constructor(
    private drizzleService: DrizzleService,
    @Configuration() private settings: Configuration
  ) {}

  /**
   * Called when the module is initialized
   * Connections are already established by the DRIZZLE_CONNECTIONS provider
   */
  $onInit(): void | Promise<any> {
    return;
  }

  /**
   * Called when the module is destroyed
   * Closes all database connections
   */
  async $onDestroy(): Promise<void> {
    return this.drizzleService.closeConnections();
  }
}
