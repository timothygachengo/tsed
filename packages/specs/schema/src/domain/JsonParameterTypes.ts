/**
 * HTTP operation parameter location types.
 *
 * This enum defines where parameters can be located in an HTTP request.
 * These types are used for both JSON Schema and OpenAPI parameter definitions.
 *
 * ### Parameter Locations
 *
 * - **BODY**: Request body parameter (payload)
 * - **PATH**: URL path parameter (e.g., `/users/{id}`)
 * - **QUERY**: URL query string parameter (e.g., `?page=1`)
 * - **HEADER**: HTTP header parameter (e.g., `Authorization`)
 * - **COOKIES**: Cookie parameter
 * - **FILES**: File upload parameter (multipart/form-data)
 *
 * ### Usage
 *
 * ```typescript
 * import {JsonParameterTypes} from "@tsed/schema";
 *
 * parameter.in(JsonParameterTypes.QUERY);
 * parameter.in(JsonParameterTypes.PATH);
 * ```
 *
 * @public
 */
export enum JsonParameterTypes {
  BODY = "body",
  PATH = "path",
  QUERY = "query",
  HEADER = "header",
  COOKIES = "cookie",
  FILES = "files"
}
/**
 * @ignore
 */
export function formatParameterType(type: any): any {
  return String(type).toLowerCase().replace("raw_", "").replace("cookies", "cookie");
}
/**
 * @ignore
 */
export function isParameterType(type: string) {
  return Object.values(JsonParameterTypes).includes(formatParameterType(type) as any);
}
