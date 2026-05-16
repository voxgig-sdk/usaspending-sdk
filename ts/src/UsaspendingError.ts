
import { Context } from './Context'


class UsaspendingError extends Error {

  isUsaspendingError = true

  sdk = 'Usaspending'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UsaspendingError
}

