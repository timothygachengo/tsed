import {CollectionOf} from "./collectionOf.js";

/**
 * Validates that an array contains at least one element matching the specified type/schema.
 *
 * The `@CollectionContains()` decorator uses JSON Schema's `contains` keyword to ensure
 * that at least one item in the array is valid against the given schema. This is useful
 * for validation where you need to guarantee certain elements exist in a collection
 * without requiring all elements to match.
 *
 * ### Basic Usage
 *
 * ```typescript
 * class SearchResults {
 *   @CollectionContains(String)
 *   tags: string[];
 *   // Array must contain at least one string
 * }
 * ```
 *
 * ### With String Constraints
 *
 * ```typescript
 * class ValidationModel {
 *   @CollectionContains(String).MinLength(5).MaxLength(20)
 *   keywords: string[];
 *   // Must contain at least one string between 5-20 characters
 * }
 * ```
 *
 * ### With Custom Classes
 *
 * ```typescript
 * class AdminUser {
 *   @Property()
 *   role: string;
 *
 *   @Property()
 *   permissions: string[];
 * }
 *
 * class Team {
 *   @CollectionContains(AdminUser)
 *   members: User[];
 *   // Team must contain at least one AdminUser
 * }
 * ```
 *
 * ### Mixed Type Arrays
 *
 * ```typescript
 * class DataSet {
 *   @CollectionContains(Number).Minimum(100)
 *   values: (number | string)[];
 *   // Must contain at least one number >= 100
 * }
 * ```
 *
 * ### Validation Behavior
 *
 * ```typescript
 * @CollectionContains(String).MinLength(3)
 * items: string[];
 *
 * // Valid:
 * ["a", "abc", "b"]          // Contains "abc" with length >= 3
 * ["hello", "world"]         // Both match, but only one needed
 *
 * // Invalid:
 * ["a", "b", "c"]            // No string with length >= 3
 * []                         // Empty array has no matching elements
 * ```
 *
 * ### Use Cases
 *
 * - **Required Elements**: Ensure specific items exist in collections
 * - **Mixed Arrays**: Validate presence of certain types in heterogeneous arrays
 * - **Quality Checks**: Guarantee minimum quality standards for at least one item
 * - **Search Results**: Ensure relevant results exist in search responses
 *
 * ### Chaining with Other Validators
 *
 * ```typescript
 * class ProductList {
 *   @CollectionContains(String).MinLength(3)
 *   @MinItems(1)
 *   @MaxItems(10)
 *   names: string[];
 *   // 1-10 items, with at least one name having 3+ characters
 * }
 * ```
 *
 * ### vs CollectionOf
 *
 * - `@CollectionContains()`: At least **one** element must match the schema
 * - `@CollectionOf()`: **All** elements must match the schema
 *
 * @param type - The type or class that at least one array element must match
 *
 * @decorator
 * @validation
 * @public
 */
export function CollectionContains(type: any) {
  return CollectionOf(type).Contains();
}
