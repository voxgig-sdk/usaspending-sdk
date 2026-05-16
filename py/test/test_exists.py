# ProjectName SDK exists test

import pytest
from usaspending_sdk import UsaspendingSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UsaspendingSDK.test(None, None)
        assert testsdk is not None
