# Usaspending SDK

Query US federal spending data — agencies, awards, contracts, grants, and account balances from USAspending.gov

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About USAspending API

The [USAspending API](https://api.usaspending.gov/) is the public data interface for [USAspending.gov](https://www.usaspending.gov/), the official source of US federal government spending data. It is maintained by the Bureau of the Fiscal Service at the U.S. Department of the Treasury and reports data collected under the Digital Accountability and Transparency Act (DATA Act).

The API exposes federal spending records including contracts, grants, loans, and other financial assistance, alongside agency budgets and account-level balances. Both `GET` endpoints (for specific records) and `POST` endpoints (for advanced filtered searches across awards and spending) are supported.

The service is open and does not require authentication or an API key. The underlying codebase is open source on GitHub at [fedspendingtransparency/usaspending-api](https://github.com/fedspendingtransparency/usaspending-api).

## Try it

**TypeScript**
```bash
npm install usaspending
```

**Python**
```bash
pip install usaspending-sdk
```

**PHP**
```bash
composer require voxgig/usaspending-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/usaspending-sdk/go
```

**Ruby**
```bash
gem install usaspending-sdk
```

**Lua**
```bash
luarocks install usaspending-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UsaspendingSDK } from 'usaspending'

const client = new UsaspendingSDK({})

// List all accounts
const accounts = await client.Account().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o usaspending-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "usaspending": {
      "command": "/abs/path/to/usaspending-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Account** | Federal account balances and budgetary resources, including treasury account and federal account level financial data. | `/accounts/` |
| **Agency** | Top-tier and sub-tier federal agency reference data and agency spending profiles (e.g. `/api/v2/references/toptier_agencies/`). | `/agencies/` |
| **Award** | Individual federal awards — contracts, grants, loans, and other financial assistance — with detail endpoints for award records. | `/awards/` |
| **Search** | Advanced filtered search across awards and transactions using POST requests with multi-field filter payloads (e.g. `spending_by_award`). | `/search/spending_by_award/` |
| **Spending** | Aggregated spending breakdowns by agency, category, geography, or time period. | `/spending/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from usaspending_sdk import UsaspendingSDK

client = UsaspendingSDK({})

# List all accounts
accounts, err = client.Account(None).list(None, None)
```

### PHP

```php
<?php
require_once 'usaspending_sdk.php';

$client = new UsaspendingSDK([]);

// List all accounts
[$accounts, $err] = $client->Account(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/usaspending-sdk/go"

client := sdk.NewUsaspendingSDK(map[string]any{})

// List all accounts
accounts, err := client.Account(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Usaspending_sdk"

client = UsaspendingSDK.new({})

# List all accounts
accounts, err = client.Account(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("usaspending_sdk")

local client = sdk.new({})

-- List all accounts
local accounts, err = client:Account(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UsaspendingSDK.test()
const result = await client.Account().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UsaspendingSDK.test(None, None)
result, err = client.Account(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UsaspendingSDK::test(null, null);
[$result, $err] = $client->Account(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Account(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UsaspendingSDK.test(nil, nil)
result, err = client.Account(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Account(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the USAspending API

- Upstream: [https://www.usaspending.gov/](https://www.usaspending.gov/)
- API docs: [https://api.usaspending.gov/docs/intro-tutorial](https://api.usaspending.gov/docs/intro-tutorial)

- Data published by the U.S. Department of the Treasury under the DATA Act
- API source code is open source (see [fedspendingtransparency/usaspending-api](https://github.com/fedspendingtransparency/usaspending-api) on GitHub)
- As a US federal government work, content is generally in the public domain; verify attribution requirements before redistribution

---

Generated from the USAspending API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
