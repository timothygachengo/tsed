import {DecoratorTypes, isClass, Metadata, prototypeOf, Type} from "@tsed/core";

import {JsonEntityComponent} from "../decorators/config/jsonEntityComponent.js";
import type {JsonClassStore} from "./JsonClassStore.js";
import {JsonEntityStore} from "./JsonEntityStore.js";
import {JsonSchema} from "./JsonSchema.js";

/**
 * Store for property metadata and schema information.
 *
 * JsonPropertyStore manages metadata for class properties decorated with schema decorators
 * like `@Property()`, `@Required()`, `@MinLength()`, etc. It handles schema generation,
 * type resolution, and integration with the parent class schema.
 *
 * ### Responsibilities
 *
 * - **Schema Generation**: Creates and maintains the JsonSchema for the property
 * - **Type Resolution**: Resolves property types including primitives, classes, and collections
 * - **Parent Integration**: Registers the property schema with the parent class schema
 * - **Collection Handling**: Special handling for arrays, Sets, Maps, and other collections
 *
 * ### Usage
 *
 * ```typescript
 * // Get property store
 * const propertyStore = JsonPropertyStore.get(MyClass, "propertyName");
 *
 * // Access property schema
 * const schema = propertyStore.schema;
 *
 * // Check property type
 * const type = propertyStore.type;
 * const isCollection = propertyStore.isCollection;
 * ```
 *
 * ### Schema Integration
 *
 * When a property is decorated, this store:
 * 1. Resolves the property's TypeScript type
 * 2. Creates an appropriate JsonSchema
 * 3. Registers it in the parent class's `properties` object
 * 4. Handles collection item schemas for arrays/collections
 *
 * ### Type Handling
 *
 * - **Primitives**: Creates schema with appropriate type (string, number, boolean, etc.)
 * - **Classes**: Creates object schema with reference to the class schema
 * - **Collections**: Creates array schema with item type schema
 *
 * @public
 */
@JsonEntityComponent(DecoratorTypes.PROP)
export class JsonPropertyStore extends JsonEntityStore {
  readonly parent: JsonClassStore = JsonEntityStore.from(this.target);

  static get(target: Type<any>, propertyKey: string | symbol) {
    return JsonEntityStore.from<JsonPropertyStore>(prototypeOf(target), propertyKey);
  }

  protected build() {
    if (!this._type) {
      this.buildType(Metadata.getType(prototypeOf(this.target), this.propertyKey));
    }

    this._type = this._type || Object;

    const properties = this.parent.schema.get("properties");

    let schema: JsonSchema = properties[this.propertyName];

    if (!schema) {
      this.parent.children.set(this.propertyName, this);

      if (this.isCollection) {
        schema = JsonSchema.from({
          type: this.collectionType
        });
        schema.itemSchema(this.type);
      } else if (isClass(this.type)) {
        schema = JsonSchema.from({type: "object"});
        schema.itemSchema(this.type);
      } else {
        schema = JsonSchema.from({type: this.type});
      }
    }

    this.parent.schema.addProperty(this.propertyName, schema);

    this._schema = schema;
  }
}

/**
 * @alias JsonPropertyStore
 */
export type PropertyMetadata = JsonPropertyStore;
export const PropertyMetadata = JsonPropertyStore;
