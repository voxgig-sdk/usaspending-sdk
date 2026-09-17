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
# @!attribute [rw] total_budgetary_resources
#   @return [Float, nil]
Account = Struct.new(
  :account_name,
  :account_number,
  :total_budgetary_resources,
  keyword_init: true
)

# Request payload for Account#list.
#
# @!attribute [rw] fiscal_year
#   @return [Integer, nil]
AccountListMatch = Struct.new(
  :fiscal_year,
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
# @!attribute [rw] total_obligations
#   @return [Float, nil]
Agency = Struct.new(
  :code,
  :id,
  :name,
  :total_obligations,
  keyword_init: true
)

# Request payload for Agency#list.
#
# @!attribute [rw] sort
#   @return [String, nil]
AgencyListMatch = Struct.new(
  :sort,
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

# Request payload for Award#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
AwardListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

# Search entity data model.
class Search
end

# Request payload for Search#create.
class SearchCreateData
end

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

# Request payload for Spending#list.
#
# @!attribute [rw] agency
#   @return [String, nil]
#
# @!attribute [rw] fiscal_year
#   @return [Integer, nil]
SpendingListMatch = Struct.new(
  :agency,
  :fiscal_year,
  keyword_init: true
)

