

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


describe('AwardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USASPENDING_TEST_LIVE=TRUE.
  afterEach(liveDelay('USASPENDING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UsaspendingSDK.test()
    const ent = testsdk.Award()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USASPENDING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'award.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"agency","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"amount","req":false,"type":"`$NUMBER`","index$":1},{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"recipient","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"type","req":false,"type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"award","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /awards/","json":"{\"operationId\":\"listAwards\",\"parameters\":[{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"type\":\"integer\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"page_metadata\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"hasNext\":{\"type\":\"boolean\"},\"hasPrevious\":{\"type\":\"boolean\"},\"page\":{\"type\":\"integer\"}},\"type\":\"object\"},\"results\":{\"items\":{\"properties\":{\"agency\":{\"type\":\"object\"},\"amount\":{\"type\":\"number\"},\"description\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"recipient\":{\"type\":\"object\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of awards\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/awards/","segments":[{"lit":"awards"}],"select":{"exist":["limit","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"award","name__orig":"award","Name":"Award","name_":"award","name-":"award","NAME":"AWARD","index$":2}, {"active":true,"entity":"award","key$":"BasicAwardFlow","kind":"basic","name":"BasicAwardFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"award_ref01"}}],"index$":0}]}, 'Award')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let award_ref01_data = Object.values(setup.data.existing.award)[0] as any

    // LIST
    const award_ref01_ent = client.Award()
    const award_ref01_match: any = {}

    const award_ref01_list = (await award_ref01_ent.list(award_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/award/AwardTestData.json')

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
    ['award01','award02','award03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USASPENDING_TEST_AWARD_ENTID': idmap,
    'USASPENDING_TEST_LIVE': 'FALSE',
    'USASPENDING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['USASPENDING_TEST_AWARD_ENTID']

  const live = 'TRUE' === env.USASPENDING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USASPENDING_TEST_AWARD_ENTID']
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
  
