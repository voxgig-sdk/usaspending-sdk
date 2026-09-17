// Typed models for the Usaspending SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Account {
  account_name?: string
  account_number?: string
  total_budgetary_resources?: number
}

export interface AccountListMatch {
  fiscal_year?: number
}

export interface Agency {
  code?: string
  id?: string
  name?: string
  total_obligations?: number
}

export interface AgencyListMatch {
  sort?: string
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
  limit?: number
  page?: number
}

export interface Search {
}

export interface SearchCreateData {

  // Selects a custom action instead of the plain create:
  //   'spending_by_award' | 'spending_by_geography'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Spending {
  breakdown?: any[]
  fiscal_year?: number
  total_spending?: number
}

export interface SpendingListMatch {
  agency?: string
  fiscal_year?: number
}

