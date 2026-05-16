# Usaspending SDK utility: feature_add
module UsaspendingUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
