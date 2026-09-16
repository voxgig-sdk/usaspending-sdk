package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Usaspending",
			"slug": "usaspending",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.usaspending.gov/api/v2",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"account": map[string]any{},
				"agency": map[string]any{},
				"award": map[string]any{},
				"search": map[string]any{},
				"spending": map[string]any{},
			},
		},
		"entity": map[string]any{
			"account": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "account_number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_budgetary_resources",
						"type": "`$NUMBER`",
					},
				},
				"name": "account",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "fiscal_year",
											"orig": "fiscal_year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fiscal_year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"accounts",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"agency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_obligations",
						"type": "`$NUMBER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "agency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/agencies/",
								"segments": []any{
									map[string]any{
										"lit": "agencies",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"agencies",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"award": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agency",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "recipient",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "award",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/awards/",
								"segments": []any{
									map[string]any{
										"lit": "awards",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"awards",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "fields",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "filters",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "geo_layer",
						"short": "Geographic layer granularity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "page_metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "scope",
						"short": "Geographic scope for the search",
						"type": "`$STRING`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/search/spending_by_award/",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "spending_by_award",
									},
								},
								"select": map[string]any{
									"$action": "spending_by_award",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"search",
									"spending_by_award",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/search/spending_by_geography/",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "spending_by_geography",
									},
								},
								"select": map[string]any{
									"$action": "spending_by_geography",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"search",
									"spending_by_geography",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"spending": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "breakdown",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "fiscal_year",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_spending",
						"type": "`$NUMBER`",
					},
				},
				"name": "spending",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "agency",
											"orig": "agency",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "fiscal_year",
											"orig": "fiscal_year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/spending/",
								"segments": []any{
									map[string]any{
										"lit": "spending",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"agency",
										"fiscal_year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.breakdown`",
								},
								"parts": []any{
									"spending",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
