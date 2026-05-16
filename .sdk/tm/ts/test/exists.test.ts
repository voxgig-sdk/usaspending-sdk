
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UsaspendingSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UsaspendingSDK.test()
    equal(null !== testsdk, true)
  })

})
