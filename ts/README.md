# Usaspending TypeScript SDK



The TypeScript SDK for the Usaspending API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Account()` — each with a small set of operations (`list`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/usaspending-sdk/releases](https://github.com/voxgig-sdk/usaspending-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { UsaspendingSDK } from '@voxgig-sdk/usaspending'

const client = new UsaspendingSDK()
```

### 2. List account records

`list()` resolves to an array of Account objects — iterate it directly:

```ts
const accounts = await client.Account().list()

for (const account of accounts) {
  console.log(account)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const accounts = await client.Account().list()
  console.log(accounts)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = UsaspendingSDK.test()

const account = await client.Account().list()
// account is a bare entity populated with mock response data
console.log(account)
```

You can also use the instance method:

```ts
const client = new UsaspendingSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Account()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new UsaspendingSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
USASPENDING_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### UsaspendingSDK

#### Constructor

```ts
new UsaspendingSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Account(data?)` | `AccountEntity` | Create an Account entity instance. |
| `Agency(data?)` | `AgencyEntity` | Create an Agency entity instance. |
| `Award(data?)` | `AwardEntity` | Create an Award entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Spending(data?)` | `SpendingEntity` | Create a Spending entity instance. |
| `tester(testopts?, sdkopts?)` | `UsaspendingSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `UsaspendingSDK.test(testopts?, sdkopts?)` | `UsaspendingSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): UsaspendingSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `create` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Account

| Field | Description |
| --- | --- |
| `account_name` |  |
| `account_number` |  |
| `total_budgetary_resource` |  |

Operations: list.

API path: `/accounts/`

#### Agency

| Field | Description |
| --- | --- |
| `code` |  |
| `id` |  |
| `name` |  |
| `total_obligation` |  |

Operations: list.

API path: `/agencies/`

#### Award

| Field | Description |
| --- | --- |
| `agency` |  |
| `amount` |  |
| `description` |  |
| `id` |  |
| `recipient` |  |
| `type` |  |

Operations: list.

API path: `/awards/`

#### Search

| Field | Description |
| --- | --- |
| `field` |  |
| `filter` |  |
| `geo_layer` |  |
| `limit` |  |
| `page` |  |
| `page_metadata` |  |
| `result` |  |
| `scope` |  |

Operations: create.

API path: `/search/spending_by_award/`

#### Spending

| Field | Description |
| --- | --- |
| `breakdown` |  |
| `fiscal_year` |  |
| `total_spending` |  |

Operations: list.

API path: `/spending/`



## Entities


### Account

Create an instance: `const account = client.Account()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_name` | `string` |  |
| `account_number` | `string` |  |
| `total_budgetary_resource` | `number` |  |

#### Example: List

```ts
const accounts = await client.Account().list()
```


### Agency

Create an instance: `const agency = client.Agency()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `total_obligation` | `number` |  |

#### Example: List

```ts
const agencys = await client.Agency().list()
```


### Award

Create an instance: `const award = client.Award()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `Record<string, any>` |  |
| `amount` | `number` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `recipient` | `Record<string, any>` |  |
| `type` | `string` |  |

#### Example: List

```ts
const awards = await client.Award().list()
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `field` | `any[]` |  |
| `filter` | `Record<string, any>` |  |
| `geo_layer` | `string` |  |
| `limit` | `number` |  |
| `page` | `number` |  |
| `page_metadata` | `Record<string, any>` |  |
| `result` | `any[]` |  |
| `scope` | `string` |  |

#### Example: Create

```ts
const search = await client.Search().create({
})
```


### Spending

Create an instance: `const spending = client.Spending()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakdown` | `any[]` |  |
| `fiscal_year` | `number` |  |
| `total_spending` | `number` |  |

#### Example: List

```ts
const spendings = await client.Spending().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
usaspending/
├── src/
│   ├── UsaspendingSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { UsaspendingSDK } from '@voxgig-sdk/usaspending'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const account = client.Account()
await account.list()

// account.data() now returns the account data from the last `list`
// account.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
