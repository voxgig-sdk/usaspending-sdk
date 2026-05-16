# Usaspending SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UsaspendingFeatures
  def self.make_feature(name)
    case name
    when "base"
      UsaspendingBaseFeature.new
    when "test"
      UsaspendingTestFeature.new
    else
      UsaspendingBaseFeature.new
    end
  end
end
