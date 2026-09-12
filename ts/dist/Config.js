"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Usaspending',
        slug: "usaspending",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://api.usaspending.gov/api/v2",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            account: {},
            agency: {},
            award: {},
            search: {},
            spending: {},
        }
    };
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
            "fields": [
                {
                    "name": "fields",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "filters",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "geo_layer",
                    "short": "Geographic layer granularity",
                    "type": "`$STRING`"
                },
                {
                    "name": "limit",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "page",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "page_metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "scope",
                    "short": "Geographic scope for the search",
                    "type": "`$STRING`"
                }
            ],
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map