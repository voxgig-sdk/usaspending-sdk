-- Typed models for the Usaspending SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Account
---@field account_name? string
---@field account_number? string
---@field total_budgetary_resource? number

---@class AccountListMatch
---@field account_name? string
---@field account_number? string
---@field total_budgetary_resource? number

---@class Agency
---@field code? string
---@field id? string
---@field name? string
---@field total_obligation? number

---@class AgencyListMatch
---@field code? string
---@field id? string
---@field name? string
---@field total_obligation? number

---@class Award
---@field agency? table
---@field amount? number
---@field description? string
---@field id? string
---@field recipient? table
---@field type? string

---@class AwardListMatch
---@field agency? table
---@field amount? number
---@field description? string
---@field id? string
---@field recipient? table
---@field type? string

---@class Search
---@field field? table
---@field filter? table
---@field geo_layer? string
---@field limit? number
---@field page? number
---@field page_metadata? table
---@field result? table
---@field scope? string

---@class SearchCreateData
---@field field? table
---@field filter? table
---@field geo_layer? string
---@field limit? number
---@field page? number
---@field page_metadata? table
---@field result? table
---@field scope? string

---@class Spending
---@field breakdown? table
---@field fiscal_year? number
---@field total_spending? number

---@class SpendingListMatch
---@field breakdown? table
---@field fiscal_year? number
---@field total_spending? number

local M = {}

return M
