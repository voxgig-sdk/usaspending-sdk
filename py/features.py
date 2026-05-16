# Usaspending SDK feature factory

from feature.base_feature import UsaspendingBaseFeature
from feature.test_feature import UsaspendingTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UsaspendingBaseFeature(),
        "test": lambda: UsaspendingTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
