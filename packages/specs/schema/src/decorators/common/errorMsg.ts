import {JsonEntityFn} from "./jsonEntityFn.js";

/**
 * Adds custom error messages for validation failures using ajv-errors.
 *
 * The `@ErrorMsg()` decorator allows specifying custom error messages that override
 * the default validation error messages. This requires the ajv-errors plugin to be
 * configured with your AJV validator.
 *
 * ### Basic Usage
 *
 * ```typescript
 * class UserModel {
 *   @ErrorMsg({ required: "Username is required" })
 *   @Required()
 *   username: string;
 * }
 * ```
 *
 * ### Multiple Validation Errors
 *
 * ```typescript
 * class PasswordModel {
 *   @ErrorMsg({
 *     required: "Password is required",
 *     minLength: "Password must be at least 8 characters",
 *     pattern: "Password must contain letters and numbers"
 *   })
 *   @Required()
 *   @MinLength(8)
 *   @Pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
 *   password: string;
 * }
 * ```
 *
 * ### Use Cases
 *
 * - **User-Friendly Messages**: Replace technical validation errors with clear messages
 * - **Localization**: Provide translated error messages
 * - **Business Context**: Add domain-specific error descriptions
 * - **API Consistency**: Standardize error message formats
 *
 * ### Important Notes
 *
 * - Requires ajv-errors plugin to be installed and configured
 * - Keys should match the validation keywords (required, minLength, etc.)
 * - Messages are stored as custom schema keys
 *
 * @param obj - Object mapping validation keywords to custom error messages
 *
 * @decorator
 * @public
 */
export function ErrorMsg(obj: Record<string, string>) {
  return JsonEntityFn((store) => {
    // since errorMessage is a custom key, it is prefixed with a # to avoid conflict with JSON Schema keywords
    const errorMessage = store.parentSchema.get("#errorMessage") || {};
    store.parentSchema.customKey("errorMessage", {...errorMessage, ...obj});
  });
}
