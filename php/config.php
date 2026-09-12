<?php
declare(strict_types=1);

// Usaspending SDK configuration

class UsaspendingConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Usaspending",
                "slug" => "usaspending",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.usaspending.gov/api/v2",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "account" => [],
                    "agency" => [],
                    "award" => [],
                    "search" => [],
                    "spending" => [],
                ],
            ],
            "entity" => [
        'account' => [
          'fields' => [
            [
              'name' => 'account_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'account_number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total_budgetary_resources',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'account',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'fiscal_year',
                        'orig' => 'fiscal_year',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/accounts/',
                  'segments' => [
                    [
                      'lit' => 'accounts',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'fiscal_year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'parts' => [
                    'accounts',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'agency' => [
          'fields' => [
            [
              'name' => 'code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total_obligations',
              'type' => '`$NUMBER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'agency',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/agencies/',
                  'segments' => [
                    [
                      'lit' => 'agencies',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'sort',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'parts' => [
                    'agencies',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'award' => [
          'fields' => [
            [
              'name' => 'agency',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'amount',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'recipient',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'award',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/awards/',
                  'segments' => [
                    [
                      'lit' => 'awards',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'awards',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'fields',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'filters',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'geo_layer',
              'short' => 'Geographic layer granularity',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'limit',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'page',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'page_metadata',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'results',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'scope',
              'short' => 'Geographic scope for the search',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'search',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/search/spending_by_award/',
                  'segments' => [
                    [
                      'lit' => 'search',
                    ],
                    [
                      'lit' => 'spending_by_award',
                    ],
                  ],
                  'select' => [
                    '$action' => 'spending_by_award',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'search',
                    'spending_by_award',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/search/spending_by_geography/',
                  'segments' => [
                    [
                      'lit' => 'search',
                    ],
                    [
                      'lit' => 'spending_by_geography',
                    ],
                  ],
                  'select' => [
                    '$action' => 'spending_by_geography',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'search',
                    'spending_by_geography',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'spending' => [
          'fields' => [
            [
              'name' => 'breakdown',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'fiscal_year',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'total_spending',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'spending',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'agency',
                        'orig' => 'agency',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'fiscal_year',
                        'orig' => 'fiscal_year',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/spending/',
                  'segments' => [
                    [
                      'lit' => 'spending',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'agency',
                      'fiscal_year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.breakdown`',
                  ],
                  'parts' => [
                    'spending',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return UsaspendingFeatures::make_feature($name);
    }
}
