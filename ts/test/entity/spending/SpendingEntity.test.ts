

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


describe('SpendingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USASPENDING_TEST_LIVE=TRUE.
  afterEach(liveDelay('USASPENDING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UsaspendingSDK.test()
    const ent = testsdk.Spending()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USASPENDING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'spending.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"breakdown","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"fiscal_year","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"total_spending","req":false,"type":"`$NUMBER`","index$":2}],"name":"spending","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"agency","orig":"agency","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"fiscal_year","orig":"fiscal_year","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /spending/","json":"{\"operationId\":\"getSpending\",\"parameters\":[{\"description\":\"Federal fiscal year for the spending data\",\"in\":\"query\",\"name\":\"fiscal_year\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter by agency code or name\",\"in\":\"query\",\"name\":\"agency\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"breakdown\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"fiscal_year\":{\"type\":\"integer\"},\"total_spending\":{\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful response with spending data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/spending/","segments":[{"lit":"spending"}],"select":{"exist":["agency","fiscal_year"]},"transform":{"req":"`reqdata`","res":"`body.breakdown`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"spending","name__orig":"spending","Name":"Spending","name_":"spending","name-":"spending","NAME":"SPENDING","index$":4}, {"active":true,"entity":"spending","key$":"BasicSpendingFlow","kind":"basic","name":"BasicSpendingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"spending_ref01"}}],"index$":0}]}, 'Spending')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let spending_ref01_data = Object.values(setup.data.existing.spending)[0] as any

    // LIST
    const spending_ref01_ent = client.Spending()
    const spending_ref01_match: any = {}

    const spending_ref01_list = (await spending_ref01_ent.list(spending_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/spending/SpendingTestData.json')

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
    ['spending01','spending02','spending03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USASPENDING_TEST_SPENDING_ENTID': idmap,
    'USASPENDING_TEST_LIVE': 'FALSE',
    'USASPENDING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['USASPENDING_TEST_SPENDING_ENTID']

  const live = 'TRUE' === env.USASPENDING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USASPENDING_TEST_SPENDING_ENTID']
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
  
