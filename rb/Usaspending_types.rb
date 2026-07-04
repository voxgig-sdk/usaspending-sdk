# frozen_string_literal: true

# Typed models for the Usaspending SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Account entity data model.
#
# @!attribute [rw] account_name
#   @return [String, nil]
#
# @!attribute [rw] account_number
#   @return [String, nil]
#
# @!attribute [rw] total_budgetary_resource
#   @return [Float, nil]
Account = Struct.new(
  :account_name,
  :account_number,
  :total_budgetary_resource,
  keyword_init: true
)

# Match filter for Account#list (any subset of Account fields).
#
# @!attribute [rw] account_name
#   @return [String, nil]
#
# @!attribute [rw] account_number
#   @return [String, nil]
#
# @!attribute [rw] total_budgetary_resource
#   @return [Float, nil]
AccountListMatch = Struct.new(
  :account_name,
  :account_number,
  :total_budgetary_resource,
  keyword_init: true
)

# Agency entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] total_obligation
#   @return [Float, nil]
Agency = Struct.new(
  :code,
  :id,
  :name,
  :total_obligation,
  keyword_init: true
)

# Match filter for Agency#list (any subset of Agency fields).
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] total_obligation
#   @return [Float, nil]
AgencyListMatch = Struct.new(
  :code,
  :id,
  :name,
  :total_obligation,
  keyword_init: true
)

# Award entity data model.
#
# @!attribute [rw] agency
#   @return [Hash, nil]
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Award = Struct.new(
  :agency,
  :amount,
  :description,
  :id,
  :recipient,
  :type,
  keyword_init: true
)

# Match filter for Award#list (any subset of Award fields).
#
# @!attribute [rw] agency
#   @return [Hash, nil]
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
AwardListMatch = Struct.new(
  :agency,
  :amount,
  :description,
  :id,
  :recipient,
  :type,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] filter
#   @return [Hash, nil]
#
# @!attribute [rw] geo_layer
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_metadata
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
Search = Struct.new(
  :field,
  :filter,
  :geo_layer,
  :limit,
  :page,
  :page_metadata,
  :result,
  :scope,
  keyword_init: true
)

# Match filter for Search#create (any subset of Search fields).
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] filter
#   @return [Hash, nil]
#
# @!attribute [rw] geo_layer
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_metadata
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
SearchCreateData = Struct.new(
  :field,
  :filter,
  :geo_layer,
  :limit,
  :page,
  :page_metadata,
  :result,
  :scope,
  keyword_init: true
)

# Spending entity data model.
#
# @!attribute [rw] breakdown
#   @return [Array, nil]
#
# @!attribute [rw] fiscal_year
#   @return [Integer, nil]
#
# @!attribute [rw] total_spending
#   @return [Float, nil]
Spending = Struct.new(
  :breakdown,
  :fiscal_year,
  :total_spending,
  keyword_init: true
)

# Match filter for Spending#list (any subset of Spending fields).
#
# @!attribute [rw] breakdown
#   @return [Array, nil]
#
# @!attribute [rw] fiscal_year
#   @return [Integer, nil]
#
# @!attribute [rw] total_spending
#   @return [Float, nil]
SpendingListMatch = Struct.new(
  :breakdown,
  :fiscal_year,
  :total_spending,
  keyword_init: true
)

