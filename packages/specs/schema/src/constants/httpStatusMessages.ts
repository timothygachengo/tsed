import {constantCase} from "change-case";
import statuses from "statuses";

/**
 * Map of HTTP status codes to their human-readable labels and constant names.
 *
 * This constant provides a standardized lookup table for all HTTP status codes,
 * mapping each code to both a descriptive label and a constant-case identifier.
 * The mapping is generated from the standard HTTP status code definitions.
 *
 * ### Structure
 *
 * Each entry contains:
 * - `label`: Human-readable status message (e.g., "Not Found")
 * - `code`: Constant-case identifier (e.g., "NOT_FOUND")
 *
 * ### Usage
 *
 * ```typescript
 * // Access status information
 * const status404 = HTTP_STATUS_MESSAGES["404"];
 * // { label: "Not Found", code: "NOT_FOUND" }
 * ```
 *
 * @public
 */
export const HTTP_STATUS_MESSAGES = statuses.codes.reduce((map: Record<string, {label: string; code: string}>, code: number) => {
  const message: string = String(statuses(code));
  return {
    ...map,
    [String(code)]: {label: message, code: constantCase(message)}
  };
}, {});

HTTP_STATUS_MESSAGES["200"].label = "Success";
HTTP_STATUS_MESSAGES["200"].code = "SUCCESS";

/**
 * Get the constant-case identifier for an HTTP status code.
 *
 * Converts a status code to its constant representation (e.g., 404 → "NOT_FOUND").
 * Useful for generating TypeScript constants and error codes.
 *
 * ### Usage
 *
 * ```typescript
 * const constant = getStatusConstant(404);
 * // Returns: "NOT_FOUND"
 * ```
 *
 * @param status - The HTTP status code (number or string)
 * @returns The constant-case identifier, or undefined if not found
 *
 * @public
 */
export function getStatusConstant(status: number | string) {
  return (HTTP_STATUS_MESSAGES as any)[status]?.code;
}

/**
 * Get the human-readable message for an HTTP status code.
 *
 * Returns the descriptive label associated with a status code
 * (e.g., 404 → "Not Found").
 *
 * ### Usage
 *
 * ```typescript
 * const message = getStatusMessage(404);
 * // Returns: "Not Found"
 * ```
 *
 * @param status - The HTTP status code (number or string)
 * @returns The human-readable status message, or undefined if not found
 *
 * @public
 */
export function getStatusMessage(status: number | string) {
  return (HTTP_STATUS_MESSAGES as any)[status]?.label;
}
