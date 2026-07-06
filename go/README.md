# Usaspending Golang SDK



The Golang SDK for the Usaspending API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Account(nil)` — each with the same small set of operations (`List`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/usaspending-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/usaspending-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/usaspending-sdk/go=../usaspending-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/usaspending-sdk/go"
)

func main() {
    client := sdk.New()

    // List account records — the value is the array of records itself.
    accounts, err := client.Account(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range accounts.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
accounts, err := client.Account(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = accounts
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

account, err := client.Account(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(account) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewUsaspendingSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
USASPENDING_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewUsaspendingSDK

```go
func NewUsaspendingSDK(options map[string]any) *UsaspendingSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *UsaspendingSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UsaspendingSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Account` | `(data map[string]any) UsaspendingEntity` | Create an Account entity instance. |
| `Agency` | `(data map[string]any) UsaspendingEntity` | Create an Agency entity instance. |
| `Award` | `(data map[string]any) UsaspendingEntity` | Create an Award entity instance. |
| `Search` | `(data map[string]any) UsaspendingEntity` | Create a Search entity instance. |
| `Spending` | `(data map[string]any) UsaspendingEntity` | Create a Spending entity instance. |

### Entity interface (UsaspendingEntity)

All entities implement the `UsaspendingEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    account, err := client.Account(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // account is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Account

| Field | Description |
| --- | --- |
| `"account_name"` |  |
| `"account_number"` |  |
| `"total_budgetary_resource"` |  |

Operations: List.

API path: `/accounts/`

#### Agency

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"id"` |  |
| `"name"` |  |
| `"total_obligation"` |  |

Operations: List.

API path: `/agencies/`

#### Award

| Field | Description |
| --- | --- |
| `"agency"` |  |
| `"amount"` |  |
| `"description"` |  |
| `"id"` |  |
| `"recipient"` |  |
| `"type"` |  |

Operations: List.

API path: `/awards/`

#### Search

| Field | Description |
| --- | --- |
| `"field"` |  |
| `"filter"` |  |
| `"geo_layer"` |  |
| `"limit"` |  |
| `"page"` |  |
| `"page_metadata"` |  |
| `"result"` |  |
| `"scope"` |  |

Operations: Create.

API path: `/search/spending_by_award/`

#### Spending

| Field | Description |
| --- | --- |
| `"breakdown"` |  |
| `"fiscal_year"` |  |
| `"total_spending"` |  |

Operations: List.

API path: `/spending/`



## Entities


### Account

Create an instance: `account := client.Account(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_name` | `string` |  |
| `account_number` | `string` |  |
| `total_budgetary_resource` | `float64` |  |

#### Example: List

```go
accounts, err := client.Account(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(accounts) // the array of records
```


### Agency

Create an instance: `agency := client.Agency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `total_obligation` | `float64` |  |

#### Example: List

```go
agencys, err := client.Agency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agencys) // the array of records
```


### Award

Create an instance: `award := client.Award(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `map[string]any` |  |
| `amount` | `float64` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `recipient` | `map[string]any` |  |
| `type` | `string` |  |

#### Example: List

```go
awards, err := client.Award(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(awards) // the array of records
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `field` | `[]any` |  |
| `filter` | `map[string]any` |  |
| `geo_layer` | `string` |  |
| `limit` | `int` |  |
| `page` | `int` |  |
| `page_metadata` | `map[string]any` |  |
| `result` | `[]any` |  |
| `scope` | `string` |  |

#### Example: Create

```go
result, err := client.Search(nil).Create(map[string]any{
}, nil)
```


### Spending

Create an instance: `spending := client.Spending(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakdown` | `[]any` |  |
| `fiscal_year` | `int` |  |
| `total_spending` | `float64` |  |

#### Example: List

```go
spendings, err := client.Spending(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(spendings) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/usaspending-sdk/go/
├── usaspending.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/usaspending-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
account := client.Account(nil)
account.List(nil, nil)

// account.Data() now returns the account data from the last list
// account.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
