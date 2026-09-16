

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UsaspendingSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('AccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USASPENDING_TEST_LIVE=TRUE.
  afterEach(liveDelay('USASPENDING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UsaspendingSDK.test()
    const ent = testsdk.Account()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USASPENDING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"account_name","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"account_number","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"total_budgetary_resources","req":false,"type":"`$NUMBER`","index$":2}],"name":"account","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"fiscal_year","orig":"fiscal_year","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /accounts/","json":"{\"operationId\":\"listAccounts\",\"parameters\":[{\"description\":\"Federal fiscal year\",\"in\":\"query\",\"name\":\"fiscal_year\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"results\":{\"items\":{\"properties\":{\"account_name\":{\"type\":\"string\"},\"account_number\":{\"type\":\"string\"},\"total_budgetary_resources\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with account data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/accounts/","segments":[{"lit":"accounts"}],"select":{"exist":["fiscal_year"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"account","name__orig":"account","Name":"Account","name_":"account","name-":"account","NAME":"ACCOUNT","index$":0}, {"active":true,"entity":"account","key$":"BasicAccountFlow","kind":"basic","name":"BasicAccountFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"account_ref01"}}],"index$":0}]}, 'Account')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let account_ref01_data = Object.values(setup.data.existing.account)[0] as any

    // LIST
    const account_ref01_ent = client.Account()
    const account_ref01_match: any = {}

    const account_ref01_list = (await account_ref01_ent.list(account_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/account/AccountTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UsaspendingSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['account01','account02','account03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USASPENDING_TEST_ACCOUNT_ENTID': idmap,
    'USASPENDING_TEST_LIVE': 'FALSE',
    'USASPENDING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['USASPENDING_TEST_ACCOUNT_ENTID']

  const live = 'TRUE' === env.USASPENDING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USASPENDING_TEST_ACCOUNT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UsaspendingSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.USASPENDING_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
