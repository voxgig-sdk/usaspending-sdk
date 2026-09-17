# Usaspending SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Usaspending",
            "slug": "usaspending",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.usaspending.gov/api/v2",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "account": {},
                "agency": {},
                "award": {},
                "search": {},
                "spending": {},
            },
        },
        "entity": {
      "account": {
        "fields": [
          {
            "name": "account_name",
            "type": "`$STRING`",
          },
          {
            "name": "account_number",
            "type": "`$STRING`",
          },
          {
            "name": "total_budgetary_resources",
            "type": "`$NUMBER`",
          },
        ],
        "name": "account",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "fiscal_year",
                      "orig": "fiscal_year",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/accounts/",
                "segments": [
                  {
                    "lit": "accounts",
                  },
                ],
                "select": {
                  "exist": [
                    "fiscal_year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "accounts",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "agency": {
        "fields": [
          {
            "name": "code",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "total_obligations",
            "type": "`$NUMBER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "agency",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/agencies/",
                "segments": [
                  {
                    "lit": "agencies",
                  },
                ],
                "select": {
                  "exist": [
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "agencies",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "award": {
        "fields": [
          {
            "name": "agency",
            "type": "`$OBJECT`",
          },
          {
            "name": "amount",
            "type": "`$NUMBER`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "recipient",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "award",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/awards/",
                "segments": [
                  {
                    "lit": "awards",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "awards",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [],
        "name": "search",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/search/spending_by_award/",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "spending_by_award",
                  },
                ],
                "select": {
                  "$action": "spending_by_award",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "search",
                  "spending_by_award",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/search/spending_by_geography/",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "spending_by_geography",
                  },
                ],
                "select": {
                  "$action": "spending_by_geography",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "search",
                  "spending_by_geography",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "spending": {
        "fields": [
          {
            "name": "breakdown",
            "type": "`$ARRAY`",
          },
          {
            "name": "fiscal_year",
            "type": "`$INTEGER`",
          },
          {
            "name": "total_spending",
            "type": "`$NUMBER`",
          },
        ],
        "name": "spending",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "agency",
                      "orig": "agency",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "fiscal_year",
                      "orig": "fiscal_year",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/spending/",
                "segments": [
                  {
                    "lit": "spending",
                  },
                ],
                "select": {
                  "exist": [
                    "agency",
                    "fiscal_year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.breakdown`",
                },
                "parts": [
                  "spending",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
