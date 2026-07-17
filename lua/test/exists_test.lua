-- Usaspending SDK exists test

local sdk = require("usaspending_sdk")

describe("UsaspendingSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
