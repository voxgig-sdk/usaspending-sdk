# Usaspending SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UsaspendingUtility.registrar = ->(u) {
  u.clean = UsaspendingUtilities::Clean
  u.done = UsaspendingUtilities::Done
  u.make_error = UsaspendingUtilities::MakeError
  u.feature_add = UsaspendingUtilities::FeatureAdd
  u.feature_hook = UsaspendingUtilities::FeatureHook
  u.feature_init = UsaspendingUtilities::FeatureInit
  u.fetcher = UsaspendingUtilities::Fetcher
  u.make_fetch_def = UsaspendingUtilities::MakeFetchDef
  u.make_context = UsaspendingUtilities::MakeContext
  u.make_options = UsaspendingUtilities::MakeOptions
  u.make_request = UsaspendingUtilities::MakeRequest
  u.make_response = UsaspendingUtilities::MakeResponse
  u.make_result = UsaspendingUtilities::MakeResult
  u.make_point = UsaspendingUtilities::MakePoint
  u.make_spec = UsaspendingUtilities::MakeSpec
  u.make_url = UsaspendingUtilities::MakeUrl
  u.param = UsaspendingUtilities::Param
  u.prepare_auth = UsaspendingUtilities::PrepareAuth
  u.prepare_body = UsaspendingUtilities::PrepareBody
  u.prepare_headers = UsaspendingUtilities::PrepareHeaders
  u.prepare_method = UsaspendingUtilities::PrepareMethod
  u.prepare_params = UsaspendingUtilities::PrepareParams
  u.prepare_path = UsaspendingUtilities::PreparePath
  u.prepare_query = UsaspendingUtilities::PrepareQuery
  u.result_basic = UsaspendingUtilities::ResultBasic
  u.result_body = UsaspendingUtilities::ResultBody
  u.result_headers = UsaspendingUtilities::ResultHeaders
  u.transform_request = UsaspendingUtilities::TransformRequest
  u.transform_response = UsaspendingUtilities::TransformResponse
}
