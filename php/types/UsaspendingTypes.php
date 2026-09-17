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
    public ?float $total_budgetary_resources = null;
}

/** Request payload for Account#list. */
class AccountListMatch
{
    public ?int $fiscal_year = null;
}

/** Agency entity data model. */
class Agency
{
    public ?string $code = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?float $total_obligations = null;
}

/** Request payload for Agency#list. */
class AgencyListMatch
{
    public ?string $sort = null;
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
    public ?int $limit = null;
    public ?int $page = null;
}

/** Search entity data model. */
class Search
{
}

/** Request payload for Search#create. */
class SearchCreateData
{
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
    public ?string $agency = null;
    public ?int $fiscal_year = null;
}

