-- Usaspending SDK error

local UsaspendingError = {}
UsaspendingError.__index = UsaspendingError


function UsaspendingError.new(code, msg, ctx)
  local self = setmetatable({}, UsaspendingError)
  self.is_sdk_error = true
  self.sdk = "Usaspending"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UsaspendingError:error()
  return self.msg
end


function UsaspendingError:__tostring()
  return self.msg
end


return UsaspendingError
