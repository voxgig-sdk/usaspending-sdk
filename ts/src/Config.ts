
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Usaspending',
        slug: "usaspending",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.usaspending.gov/api/v2",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        account: {
        },
  
        agency: {
        },
  
        award: {
        },
  
        search: {
        },
  
        spending: {
        },
  
    }
  }


  entity = {
    "account": {
      "fields": [
        {
          "name": "account_name",
          "type": "`$STRING`"
        },
        {
          "name": "account_number",
          "type": "`$STRING`"
        },
        {
          "name": "total_budgetary_resources",
          "type": "`$NUMBER`"
        }
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
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/accounts/",
              "segments": [
                {
                  "lit": "accounts"
                }
              ],
              "select": {
                "exist": [
                  "fiscal_year"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "accounts"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "agency": {
      "fields": [
        {
          "name": "code",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "total_obligations",
          "type": "`$NUMBER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/agencies/",
              "segments": [
                {
                  "lit": "agencies"
                }
              ],
              "select": {
                "exist": [
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "parts": [
                "agencies"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "award": {
      "fields": [
        {
          "name": "agency",
          "type": "`$OBJECT`"
        },
        {
          "name": "amount",
          "type": "`$NUMBER`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "recipient",
          "type": "`$OBJECT`"
        },
        {
          "name": "type",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/awards/",
              "segments": [
                {
                  "lit": "awards"
                }
              ],
              "select": {
                "exist": [
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "awards"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "search"
                },
                {
                  "lit": "spending_by_award"
                }
              ],
              "select": {
                "$action": "spending_by_award"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "search",
                "spending_by_award"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/search/spending_by_geography/",
              "segments": [
                {
                  "lit": "search"
                },
                {
                  "lit": "spending_by_geography"
                }
              ],
              "select": {
                "$action": "spending_by_geography"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "search",
                "spending_by_geography"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "spending": {
      "fields": [
        {
          "name": "breakdown",
          "type": "`$ARRAY`"
        },
        {
          "name": "fiscal_year",
          "type": "`$INTEGER`"
        },
        {
          "name": "total_spending",
          "type": "`$NUMBER`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "fiscal_year",
                    "orig": "fiscal_year",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/spending/",
              "segments": [
                {
                  "lit": "spending"
                }
              ],
              "select": {
                "exist": [
                  "agency",
                  "fiscal_year"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.breakdown`"
              },
              "parts": [
                "spending"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

