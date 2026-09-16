# Usaspending SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UsaspendingFeatures
  def self.make_feature(name)
    case name
    when "base"
      UsaspendingBaseFeature.new
    when "ratelimit"
      UsaspendingRatelimitFeature.new
    when "retry"
      UsaspendingRetryFeature.new
    when "test"
      UsaspendingTestFeature.new
    when "timeout"
      UsaspendingTimeoutFeature.new
    else
      UsaspendingBaseFeature.new
    end
  end
end
