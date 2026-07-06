<?php
declare(strict_types=1);

// Typed models for the Usaspending SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Account entity data model. */
class Account
{
    public ?string $account_name = null;
    public ?string $account_number = null;
    public ?float $total_budgetary_resource = null;
}

/** Request payload for Account#list. */
class AccountListMatch
{
    public ?string $account_name = null;
    public ?string $account_number = null;
    public ?float $total_budgetary_resource = null;
}

/** Agency entity data model. */
class Agency
{
    public ?string $code = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?float $total_obligation = null;
}

/** Request payload for Agency#list. */
class AgencyListMatch
{
    public ?string $code = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?float $total_obligation = null;
}

/** Award entity data model. */
class Award
{
    public ?array $agency = null;
    public ?float $amount = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?array $recipient = null;
    public ?string $type = null;
}

/** Request payload for Award#list. */
class AwardListMatch
{
    public ?array $agency = null;
    public ?float $amount = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?array $recipient = null;
    public ?string $type = null;
}

/** Search entity data model. */
class Search
{
    public ?array $field = null;
    public ?array $filter = null;
    public ?string $geo_layer = null;
    public ?int $limit = null;
    public ?int $page = null;
    public ?array $page_metadata = null;
    public ?array $result = null;
    public ?string $scope = null;
}

/** Request payload for Search#create. */
class SearchCreateData
{
    public ?array $field = null;
    public ?array $filter = null;
    public ?string $geo_layer = null;
    public ?int $limit = null;
    public ?int $page = null;
    public ?array $page_metadata = null;
    public ?array $result = null;
    public ?string $scope = null;
}

/** Spending entity data model. */
class Spending
{
    public ?array $breakdown = null;
    public ?int $fiscal_year = null;
    public ?float $total_spending = null;
}

/** Request payload for Spending#list. */
class SpendingListMatch
{
    public ?array $breakdown = null;
    public ?int $fiscal_year = null;
    public ?float $total_spending = null;
}

