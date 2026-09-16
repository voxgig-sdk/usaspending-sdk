

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


describe('AgencyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USASPENDING_TEST_LIVE=TRUE.
  afterEach(liveDelay('USASPENDING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UsaspendingSDK.test()
    const ent = testsdk.Agency()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USASPENDING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agency.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"total_obligations","req":false,"type":"`$NUMBER`","index$":3}],"id":{"field":"id","name":"id"},"name":"agency","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /agencies/","json":"{\"operationId\":\"listAgencies\",\"parameters\":[{\"description\":\"Sort field and direction\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"enum\":[\"name\",\"-name\",\"amount\",\"-amount\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"results\":{\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"total_obligations\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of agencies\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/agencies/","segments":[{"lit":"agencies"}],"select":{"exist":["sort"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"agency","name__orig":"agency","Name":"Agency","name_":"agency","name-":"agency","NAME":"AGENCY","index$":1}, {"active":true,"entity":"agency","key$":"BasicAgencyFlow","kind":"basic","name":"BasicAgencyFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"agency_ref01"}}],"index$":0}]}, 'Agency')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agency_ref01_data = Object.values(setup.data.existing.agency)[0] as any

    // LIST
    const agency_ref01_ent = client.Agency()
    const agency_ref01_match: any = {}

    const agency_ref01_list = (await agency_ref01_ent.list(agency_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/agency/AgencyTestData.json')

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
    ['agency01','agency02','agency03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'USASPENDING_TEST_AGENCY_ENTID': idmap,
    'USASPENDING_TEST_LIVE': 'FALSE',
    'USASPENDING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['USASPENDING_TEST_AGENCY_ENTID']

  const live = 'TRUE' === env.USASPENDING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USASPENDING_TEST_AGENCY_ENTID']
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
  
