# Usaspending SDK configuration

module UsaspendingConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Usaspending",
        "slug" => "usaspending",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.usaspending.gov/api/v2",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "account" => {},
          "agency" => {},
          "award" => {},
          "search" => {},
          "spending" => {},
        },
      },
      "entity" => {
        "account" => {
          "fields" => [
            {
              "name" => "account_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "account_number",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_budgetary_resources",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "account",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "fiscal_year",
                        "orig" => "fiscal_year",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/accounts/",
                  "segments" => [
                    {
                      "lit" => "accounts",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "fiscal_year",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "parts" => [
                    "accounts",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "agency" => {
          "fields" => [
            {
              "name" => "code",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_obligations",
              "type" => "`$NUMBER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "agency",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agencies/",
                  "segments" => [
                    {
                      "lit" => "agencies",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "sort",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "parts" => [
                    "agencies",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "award" => {
          "fields" => [
            {
              "name" => "agency",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "amount",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "description",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "recipient",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "award",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/awards/",
                  "segments" => [
                    {
                      "lit" => "awards",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "page",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "awards",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "search" => {
          "fields" => [
            {
              "name" => "fields",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "filters",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "geo_layer",
              "short" => "Geographic layer granularity",
              "type" => "`$STRING`",
            },
            {
              "name" => "limit",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "page",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "page_metadata",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "results",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "scope",
              "short" => "Geographic scope for the search",
              "type" => "`$STRING`",
            },
          ],
          "name" => "search",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/search/spending_by_award/",
                  "segments" => [
                    {
                      "lit" => "search",
                    },
                    {
                      "lit" => "spending_by_award",
                    },
                  ],
                  "select" => {
                    "$action" => "spending_by_award",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "search",
                    "spending_by_award",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/search/spending_by_geography/",
                  "segments" => [
                    {
                      "lit" => "search",
                    },
                    {
                      "lit" => "spending_by_geography",
                    },
                  ],
                  "select" => {
                    "$action" => "spending_by_geography",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "search",
                    "spending_by_geography",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "spending" => {
          "fields" => [
            {
              "name" => "breakdown",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "fiscal_year",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "total_spending",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "spending",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "agency",
                        "orig" => "agency",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "fiscal_year",
                        "orig" => "fiscal_year",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/spending/",
                  "segments" => [
                    {
                      "lit" => "spending",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "agency",
                      "fiscal_year",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.breakdown`",
                  },
                  "parts" => [
                    "spending",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    UsaspendingFeatures.make_feature(name)
  end
end
