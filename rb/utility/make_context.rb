# Usaspending SDK utility: make_context
require_relative '../core/context'
module UsaspendingUtilities
  MakeContext = ->(ctxmap, basectx) {
    UsaspendingContext.new(ctxmap, basectx)
  }
end
