package = "voxgig-sdk-usaspending"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/usaspending-sdk.git"
}
description = {
  summary = "Usaspending SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["usaspending_sdk"] = "usaspending_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
