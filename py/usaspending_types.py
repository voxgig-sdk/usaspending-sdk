# Typed models for the Usaspending SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Account(TypedDict, total=False):
    account_name: str
    account_number: str
    total_budgetary_resource: float


class AccountListMatch(TypedDict, total=False):
    account_name: str
    account_number: str
    total_budgetary_resource: float


class Agency(TypedDict, total=False):
    code: str
    id: str
    name: str
    total_obligation: float


class AgencyListMatch(TypedDict, total=False):
    code: str
    id: str
    name: str
    total_obligation: float


class Award(TypedDict, total=False):
    agency: dict
    amount: float
    description: str
    id: str
    recipient: dict
    type: str


class AwardListMatch(TypedDict, total=False):
    agency: dict
    amount: float
    description: str
    id: str
    recipient: dict
    type: str


class Search(TypedDict, total=False):
    field: list
    filter: dict
    geo_layer: str
    limit: int
    page: int
    page_metadata: dict
    result: list
    scope: str


class SearchCreateData(TypedDict, total=False):
    field: list
    filter: dict
    geo_layer: str
    limit: int
    page: int
    page_metadata: dict
    result: list
    scope: str


class Spending(TypedDict, total=False):
    breakdown: list
    fiscal_year: int
    total_spending: float


class SpendingListMatch(TypedDict, total=False):
    breakdown: list
    fiscal_year: int
    total_spending: float
