/**
 * HTTP and WebSocket operation verbs supported by Ts.ED.
 *
 * This enum defines all supported operation verbs for HTTP endpoints,
 * WebSocket operations, and special routing cases. These verbs are used
 * to define route handlers and generate OpenAPI specifications.
 *
 * ### HTTP Verbs
 * Standard HTTP methods (GET, POST, PUT, PATCH, DELETE, etc.) are supported
 * for RESTful API operations.
 *
 * ### WebSocket Verbs
 * PUBLISH and SUBSCRIBE are used for WebSocket operations and message patterns.
 *
 * ### Special Verbs
 * - ALL: Matches all HTTP methods for a route
 * - CUSTOM: Allows custom HTTP methods
 *
 * @public
 */
export enum OperationVerbs {
  ALL = "ALL", // special key
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  HEAD = "HEAD",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  PUBLISH = "PUBLISH",
  SUBSCRIBE = "SUBSCRIBE",
  CUSTOM = "CUSTOM"
}

/**
 * List of HTTP operation verbs including the special ALL and CUSTOM verbs.
 *
 * This array contains all HTTP methods supported for REST API operations,
 * excluding WebSocket-specific verbs (PUBLISH, SUBSCRIBE).
 *
 * @public
 */
export const OPERATION_HTTP_VERBS = [
  OperationVerbs.ALL,
  OperationVerbs.GET,
  OperationVerbs.POST,
  OperationVerbs.PUT,
  OperationVerbs.PATCH,
  OperationVerbs.HEAD,
  OperationVerbs.DELETE,
  OperationVerbs.OPTIONS,
  OperationVerbs.TRACE,
  OperationVerbs.CUSTOM
];

/**
 * List of WebSocket operation verbs for pub/sub messaging patterns.
 *
 * These verbs are used to define WebSocket message handlers in Ts.ED applications.
 *
 * @public
 */
export const OPERATION_WS_VERBS = [OperationVerbs.PUBLISH, OperationVerbs.SUBSCRIBE];
