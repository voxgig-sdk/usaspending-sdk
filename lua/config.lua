-- Usaspending SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Usaspending",
      slug = "usaspending",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.usaspending.gov/api/v2",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["account"] = {},
        ["agency"] = {},
        ["award"] = {},
        ["search"] = {},
        ["spending"] = {},
      },
    },
    entity = {
      ["account"] = {
        ["fields"] = {
          {
            ["name"] = "account_name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "account_number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_budgetary_resources",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "account",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "fiscal_year",
                      ["orig"] = "fiscal_year",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/accounts/",
                ["parts"] = {
                  "accounts",
                },
                ["select"] = {
                  ["exist"] = {
                    "fiscal_year",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["agency"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_obligations",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "agency",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/agencies/",
                ["parts"] = {
                  "agencies",
                },
                ["select"] = {
                  ["exist"] = {
                    "sort",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["award"] = {
        ["fields"] = {
          {
            ["name"] = "agency",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "amount",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "recipient",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "award",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/awards/",
                ["parts"] = {
                  "awards",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["search"] = {
        ["fields"] = {
          {
            ["name"] = "fields",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "filters",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "geo_layer",
            ["short"] = "Geographic layer granularity",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "limit",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "page",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "page_metadata",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "results",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "scope",
            ["short"] = "Geographic scope for the search",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "search",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/search/spending_by_award/",
                ["parts"] = {
                  "search",
                  "spending_by_award",
                },
                ["select"] = {
                  ["$action"] = "spending_by_award",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/search/spending_by_geography/",
                ["parts"] = {
                  "search",
                  "spending_by_geography",
                },
                ["select"] = {
                  ["$action"] = "spending_by_geography",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["spending"] = {
        ["fields"] = {
          {
            ["name"] = "breakdown",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "fiscal_year",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "total_spending",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "spending",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "agency",
                      ["orig"] = "agency",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "fiscal_year",
                      ["orig"] = "fiscal_year",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/spending/",
                ["parts"] = {
                  "spending",
                },
                ["select"] = {
                  ["exist"] = {
                    "agency",
                    "fiscal_year",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.breakdown`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
