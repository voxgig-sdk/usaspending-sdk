# Usaspending SDK feature factory

from usaspending_sdk.feature.base_feature import UsaspendingBaseFeature
from usaspending_sdk.feature.ratelimit_feature import UsaspendingRatelimitFeature
from usaspending_sdk.feature.retry_feature import UsaspendingRetryFeature
from usaspending_sdk.feature.test_feature import UsaspendingTestFeature
from usaspending_sdk.feature.timeout_feature import UsaspendingTimeoutFeature


_FEATURES = {
    "base": lambda: UsaspendingBaseFeature(),
    "ratelimit": lambda: UsaspendingRatelimitFeature(),
    "retry": lambda: UsaspendingRetryFeature(),
    "test": lambda: UsaspendingTestFeature(),
    "timeout": lambda: UsaspendingTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
