// Typed models for the Usaspending SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/usaspending-sdk/go/core"
)

// Account is the typed data model for the account entity.
type Account struct {
	AccountName *string `json:"account_name,omitempty"`
	AccountNumber *string `json:"account_number,omitempty"`
	TotalBudgetaryResources *float64 `json:"total_budgetary_resources,omitempty"`
}

// AccountListMatch is the typed request payload for Account.ListTyped.
type AccountListMatch struct {
	FiscalYear *int `json:"fiscal_year,omitempty"`
}

// Agency is the typed data model for the agency entity.
type Agency struct {
	Code *string `json:"code,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalObligations *float64 `json:"total_obligations,omitempty"`
}

// AgencyListMatch is the typed request payload for Agency.ListTyped.
type AgencyListMatch struct {
	Sort *string `json:"sort,omitempty"`
}

// Award is the typed data model for the award entity.
type Award struct {
	Agency *map[string]any `json:"agency,omitempty"`
	Amount *float64 `json:"amount,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Recipient *map[string]any `json:"recipient,omitempty"`
	Type *string `json:"type,omitempty"`
}

// AwardListMatch is the typed request payload for Award.ListTyped.
type AwardListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Fields *[]any `json:"fields,omitempty"`
	Filters *map[string]any `json:"filters,omitempty"`
	GeoLayer *string `json:"geo_layer,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
	PageMetadata *map[string]any `json:"page_metadata,omitempty"`
	Results *[]any `json:"results,omitempty"`
	Scope *string `json:"scope,omitempty"`
}

// SearchCreateData is the typed request payload for Search.CreateTyped.
type SearchCreateData struct {
	Fields *[]any `json:"fields,omitempty"`
	Filters *map[string]any `json:"filters,omitempty"`
	GeoLayer *string `json:"geo_layer,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
	PageMetadata *map[string]any `json:"page_metadata,omitempty"`
	Results *[]any `json:"results,omitempty"`
	Scope *string `json:"scope,omitempty"`
}

// Spending is the typed data model for the spending entity.
type Spending struct {
	Breakdown *[]any `json:"breakdown,omitempty"`
	FiscalYear *int `json:"fiscal_year,omitempty"`
	TotalSpending *float64 `json:"total_spending,omitempty"`
}

// SpendingListMatch is the typed request payload for Spending.ListTyped.
type SpendingListMatch struct {
	Agency *string `json:"agency,omitempty"`
	FiscalYear *int `json:"fiscal_year,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
