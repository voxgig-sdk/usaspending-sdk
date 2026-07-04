// Typed models for the Usaspending SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Account {
  account_name?: string
  account_number?: string
  total_budgetary_resource?: number
}

export type AccountListMatch = Partial<Account>

export interface Agency {
  code?: string
  id?: string
  name?: string
  total_obligation?: number
}

export type AgencyListMatch = Partial<Agency>

export interface Award {
  agency?: Record<string, any>
  amount?: number
  description?: string
  id?: string
  recipient?: Record<string, any>
  type?: string
}

export type AwardListMatch = Partial<Award>

export interface Search {
  field?: any[]
  filter?: Record<string, any>
  geo_layer?: string
  limit?: number
  page?: number
  page_metadata?: Record<string, any>
  result?: any[]
  scope?: string
}

export type SearchCreateData = Partial<Search>

export interface Spending {
  breakdown?: any[]
  fiscal_year?: number
  total_spending?: number
}

export type SpendingListMatch = Partial<Spending>

