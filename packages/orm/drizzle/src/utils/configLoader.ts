import {existsSync} from "node:fs";
import {join} from "node:path";

/**
 * Check if a drizzle config file exists in the project root
 * Supports both TypeScript and JavaScript config files
 *
 * @param projectRoot - Root directory of the project
 * @returns Path to config file if found, undefined otherwise
 */
export function findDrizzleConfig(projectRoot: string = process.cwd()): string | undefined {
  const possiblePaths = [
    join(projectRoot, "drizzle.config.ts"),
    join(projectRoot, "drizzle.config.js"),
    join(projectRoot, "drizzle.config.mjs"),
    join(projectRoot, "drizzle.config.cjs")
  ];

  for (const configPath of possiblePaths) {
    if (existsSync(configPath)) {
      return configPath;
    }
  }

  return undefined;
}

/**
 * Load drizzle config from file
 * Note: This requires the config to be in a format that can be imported
 *
 * @param configPath - Path to the config file
 * @returns Parsed config object or undefined
 */
export async function loadDrizzleConfig(configPath: string): Promise<any> {
  try {
    // Use dynamic import to load the config file
    const config = await import(configPath);
    return config.default || config;
  } catch (error) {
    console.warn(`Failed to load drizzle config from ${configPath}:`, error);
    return undefined;
  }
}
