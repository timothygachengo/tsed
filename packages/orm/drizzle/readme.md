# @tsed/drizzle

<div align="center">
<p>Drizzle ORM integration for Ts.ED framework</p>
</div>

## Installation

```bash
npm install @tsed/drizzle drizzle-orm
# or
yarn add @tsed/drizzle drizzle-orm
```

You'll also need to install a database driver based on your database:

**PostgreSQL:**
```bash
npm install pg
npm install --save-dev @types/pg
```

**MySQL:**
```bash
npm install mysql2
```

**SQLite:**
```bash
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3
```

**Turso/LibSQL:**
```bash
npm install @libsql/client
```

**Neon:**
```bash
npm install @neondatabase/serverless
```

**PlanetScale:**
```bash
npm install @planetscale/database
```

## Configuration

### Single Database Connection

#### PostgreSQL

Configure Drizzle with PostgreSQL using the `pg` driver:

```typescript
import {Configuration} from "@tsed/di";
import {DrizzleModule} from "@tsed/drizzle";
import {Pool} from "pg";
import * as schema from "./schema";

@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "postgres",
    connection: new Pool({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "password",
      database: "mydb"
    }),
    schema: schema,
    logger: true
  }
})
export class Server {}
```

Or with a connection string:

```typescript
@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "postgres",
    connection: process.env.DATABASE_URL, // "postgresql://user:pass@host:5432/db"
    schema: schema
  }
})
export class Server {}
```

#### MySQL

Configure Drizzle with MySQL using the `mysql2` driver:

```typescript
import {Configuration} from "@tsed/di";
import {DrizzleModule} from "@tsed/drizzle";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "mysql",
    connection: pool,
    schema: schema,
    logger: true
  }
})
export class Server {}
```

#### SQLite

Configure Drizzle with SQLite using `better-sqlite3`:

```typescript
import {Configuration} from "@tsed/di";
import {DrizzleModule} from "@tsed/drizzle";
import Database from "better-sqlite3";
import * as schema from "./schema";

@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "sqlite",
    connection: new Database("./data/sqlite.db"),
    schema: schema
  }
})
export class Server {}
```

#### Turso

Configure Drizzle with Turso/LibSQL:

```typescript
import {Configuration} from "@tsed/di";
import {DrizzleModule} from "@tsed/drizzle";
import {createClient} from "@libsql/client";
import * as schema from "./schema";

@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "turso",
    connection: createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN
    }),
    schema: schema
  }
})
export class Server {}
```

#### Neon

Configure Drizzle with Neon serverless PostgreSQL:

```typescript
import {Configuration} from "@tsed/di";
import {DrizzleModule} from "@tsed/drizzle";
import {neon} from "@neondatabase/serverless";
import * as schema from "./schema";

@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "neon",
    connection: neon(process.env.NEON_DATABASE_URL!),
    schema: schema
  }
})
export class Server {}
```

#### PlanetScale

Configure Drizzle with PlanetScale serverless:

```typescript
import {Configuration} from "@tsed/di";
import {DrizzleModule} from "@tsed/drizzle";
import {connect} from "@planetscale/database";
import * as schema from "./schema";

@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "planetscale",
    connection: connect({
      url: process.env.PLANETSCALE_DATABASE_URL!
    }),
    schema: schema
  }
})
export class Server {}
```

### Multiple Database Connections

You can configure multiple database connections with different dialects:

```typescript
import {Configuration} from "@tsed/di";
import {DrizzleModule} from "@tsed/drizzle";
import {Pool} from "pg";
import mysql from "mysql2/promise";
import * as pgSchema from "./schemas/postgres";
import * as mysqlSchema from "./schemas/mysql";

@Configuration({
  imports: [DrizzleModule],
  drizzle: [
    {
      id: "postgres",
      dialect: "postgres",
      connection: new Pool({
        host: "localhost",
        port: 5432,
        database: "maindb"
      }),
      schema: pgSchema,
      logger: true
    },
    {
      id: "mysql",
      dialect: "mysql",
      connection: mysql.createPool({
        host: "localhost",
        user: "root",
        database: "analytics"
      }),
      schema: mysqlSchema
    }
  ]
})
export class Server {}
```

## Usage

### Inject Drizzle Service

Inject the `DrizzleService` to access your database connections:

```typescript
import {Injectable} from "@tsed/di";
import {DrizzleService} from "@tsed/drizzle";
import {users} from "./schema";

@Injectable()
export class UsersRepository {
  constructor(private drizzle: DrizzleService) {}

  async findAll() {
    const db = this.drizzle.get(); // Get default connection
    return db.select().from(users);
  }

  async findById(id: number) {
    const db = this.drizzle.get();
    return db.select().from(users).where(eq(users.id, id));
  }

  async create(data: typeof users.$inferInsert) {
    const db = this.drizzle.get();
    return db.insert(users).values(data).returning();
  }
}
```

### Multiple Connections

Access different connections by their ID:

```typescript
import {Injectable} from "@tsed/di";
import {DrizzleService} from "@tsed/drizzle";

@Injectable()
export class MultiDbRepository {
  constructor(private drizzle: DrizzleService) {}

  async getPgData() {
    const pgDb = this.drizzle.get("postgres");
    // Use PostgreSQL connection
    return pgDb.select().from(pgTable);
  }

  async getSqliteData() {
    const sqliteDb = this.drizzle.get("sqlite");
    // Use SQLite connection
    return sqliteDb.select().from(sqliteTable);
  }
}
```

## Schema Definition

Define your database schema using Drizzle's schema builder:

```typescript
// schema.ts
import {pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow()
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});
```

### Automatic Schema Detection

If you don't provide a schema in your Ts.ED configuration, the module will automatically:

1. **Check for `drizzle.config.ts/js`** at the project root
2. **Load the schema** from the config file's `schema` property
3. **Merge multiple schemas** if you provide an array

Example `drizzle.config.ts`:

```typescript
import {defineConfig} from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts", // Will be auto-loaded
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
```

Then in your Ts.ED config, you can omit the schema:

```typescript
@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "postgres",
    connection: new Pool({
      connectionString: process.env.DATABASE_URL
    })
    // schema is automatically loaded from drizzle.config.ts
  }
})
export class Server {}
```

### Multiple Schema Files

You can combine multiple schema files:

```typescript
import * as users from "./schemas/users";
import * as posts from "./schemas/posts";
import * as comments from "./schemas/comments";

@Configuration({
  imports: [DrizzleModule],
  drizzle: {
    dialect: "postgres",
    connection: pool,
    schema: {...users, ...posts, ...comments} // Merge all schemas
  }
})
export class Server {}
```

## Migrations

Use Drizzle Kit to generate and run migrations:

```bash
# Generate migrations
npx drizzle-kit generate

# Run migrations
npx drizzle-kit migrate
```

Configure Drizzle Kit in `drizzle.config.ts`:

```typescript
import {defineConfig} from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
```

## Configuration Options

### Connection Options by Dialect

Each dialect has its own specific connection options:

#### PostgreSQL (`dialect: "postgres"`)

```typescript
{
  dialect: "postgres",
  connection: Pool | PoolClient | string, // From 'pg' package
  schema?: {...},
  logger?: boolean | Logger
}
```

#### MySQL (`dialect: "mysql"`)

```typescript
{
  dialect: "mysql",
  connection: Pool | Connection | PoolOptions, // From 'mysql2' package
  schema?: {...},
  logger?: boolean | Logger
}
```

#### SQLite (`dialect: "sqlite"`)

```typescript
{
  dialect: "sqlite",
  connection: Database, // From 'better-sqlite3' package
  schema?: {...},
  logger?: boolean | Logger
}
```

#### Turso/LibSQL (`dialect: "turso"`)

```typescript
{
  dialect: "turso",
  connection: Client | {url: string, authToken?: string}, // From '@libsql/client'
  schema?: {...},
  logger?: boolean | Logger
}
```

#### Neon (`dialect: "neon"`)

```typescript
{
  dialect: "neon",
  connection: NeonHttpClient | string, // From '@neondatabase/serverless'
  schema?: {...},
  logger?: boolean | Logger
}
```

#### PlanetScale (`dialect: "planetscale"`)

```typescript
{
  dialect: "planetscale",
  connection: Connection | {url: string}, // From '@planetscale/database'
  schema?: {...},
  logger?: boolean | Logger
}
```

#### SingleStore (`dialect: "singlestore"`)

```typescript
{
  dialect: "singlestore",
  connection: Pool | Connection | PoolOptions, // Uses 'mysql2' package
  schema?: {...},
  logger?: boolean | Logger
}
```

### DrizzleConnectionOptions

| Property | Type | Description |
| -------- | ---- | ----------- |
| `id` | `string` | Unique identifier for the connection (default: "default") |
| `dialect` | `"postgres" \| "mysql" \| "sqlite" \| "turso" \| "neon" \| "planetscale" \| "singlestore"` | Database dialect |
| `connection` | Varies by dialect | Database connection instance or config |
| `schema` | `Record<string, unknown>` | Database schema definition |
| `logger` | `boolean \| Logger` | Enable query logging |

## Examples

### With TypeORM-style Repository Pattern

```typescript
import {Injectable} from "@tsed/di";
import {DrizzleService} from "@tsed/drizzle";
import {eq} from "drizzle-orm";
import {users} from "./schema";

@Injectable()
export class UsersService {
  constructor(private drizzle: DrizzleService) {}

  private get db() {
    return this.drizzle.get();
  }

  async findAll() {
    return this.db.select().from(users);
  }

  async findOne(id: number) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return user;
  }

  async create(data: typeof users.$inferInsert) {
    const [user] = await this.db.insert(users).values(data).returning();
    return user;
  }

  async update(id: number, data: Partial<typeof users.$inferInsert>) {
    const [user] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async remove(id: number) {
    await this.db.delete(users).where(eq(users.id, id));
  }
}
```

### With Transactions

```typescript
import {Injectable} from "@tsed/di";
import {DrizzleService} from "@tsed/drizzle";
import {users, posts} from "./schema";

@Injectable()
export class TransactionalService {
  constructor(private drizzle: DrizzleService) {}

  async createUserWithPost(userData: any, postData: any) {
    const db = this.drizzle.get();
    
    return db.transaction(async (tx) => {
      const [user] = await tx.insert(users).values(userData).returning();
      const [post] = await tx.insert(posts).values({
        ...postData,
        authorId: user.id
      }).returning();
      
      return {user, post};
    });
  }
}
```

## Documentation

For more information about Drizzle ORM, visit the [official documentation](https://orm.drizzle.team/).

For Ts.ED documentation, visit [tsed.dev](https://tsed.dev).

## License

MIT
