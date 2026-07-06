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

export interface AccountListMatch {
  account_name?: string
  account_number?: string
  total_budgetary_resource?: number
}

export interface Agency {
  code?: string
  id?: string
  name?: string
  total_obligation?: number
}

export interface AgencyListMatch {
  code?: string
  id?: string
  name?: string
  total_obligation?: number
}

export interface Award {
  agency?: Record<string, any>
  amount?: number
  description?: string
  id?: string
  recipient?: Record<string, any>
  type?: string
}

export interface AwardListMatch {
  agency?: Record<string, any>
  amount?: number
  description?: string
  id?: string
  recipient?: Record<string, any>
  type?: string
}

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

export interface SearchCreateData {
  field?: any[]
  filter?: Record<string, any>
  geo_layer?: string
  limit?: number
  page?: number
  page_metadata?: Record<string, any>
  result?: any[]
  scope?: string
}

export interface Spending {
  breakdown?: any[]
  fiscal_year?: number
  total_spending?: number
}

export interface SpendingListMatch {
  breakdown?: any[]
  fiscal_year?: number
  total_spending?: number
}

