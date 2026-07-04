# Typed models for the Usaspending SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Account:
    account_name: Optional[str] = None
    account_number: Optional[str] = None
    total_budgetary_resource: Optional[float] = None


@dataclass
class AccountListMatch:
    account_name: Optional[str] = None
    account_number: Optional[str] = None
    total_budgetary_resource: Optional[float] = None


@dataclass
class Agency:
    code: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    total_obligation: Optional[float] = None


@dataclass
class AgencyListMatch:
    code: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    total_obligation: Optional[float] = None


@dataclass
class Award:
    agency: Optional[dict] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    id: Optional[str] = None
    recipient: Optional[dict] = None
    type: Optional[str] = None


@dataclass
class AwardListMatch:
    agency: Optional[dict] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    id: Optional[str] = None
    recipient: Optional[dict] = None
    type: Optional[str] = None


@dataclass
class Search:
    field: Optional[list] = None
    filter: Optional[dict] = None
    geo_layer: Optional[str] = None
    limit: Optional[int] = None
    page: Optional[int] = None
    page_metadata: Optional[dict] = None
    result: Optional[list] = None
    scope: Optional[str] = None


@dataclass
class SearchCreateData:
    field: Optional[list] = None
    filter: Optional[dict] = None
    geo_layer: Optional[str] = None
    limit: Optional[int] = None
    page: Optional[int] = None
    page_metadata: Optional[dict] = None
    result: Optional[list] = None
    scope: Optional[str] = None


@dataclass
class Spending:
    breakdown: Optional[list] = None
    fiscal_year: Optional[int] = None
    total_spending: Optional[float] = None


@dataclass
class SpendingListMatch:
    breakdown: Optional[list] = None
    fiscal_year: Optional[int] = None
    total_spending: Optional[float] = None

