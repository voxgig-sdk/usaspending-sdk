package voxgigusaspendingsdk

import (
	"github.com/voxgig-sdk/usaspending-sdk/core"
	"github.com/voxgig-sdk/usaspending-sdk/entity"
	"github.com/voxgig-sdk/usaspending-sdk/feature"
	_ "github.com/voxgig-sdk/usaspending-sdk/utility"
)

// Type aliases preserve external API.
type UsaspendingSDK = core.UsaspendingSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UsaspendingEntity = core.UsaspendingEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UsaspendingError = core.UsaspendingError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAccountEntityFunc = func(client *core.UsaspendingSDK, entopts map[string]any) core.UsaspendingEntity {
		return entity.NewAccountEntity(client, entopts)
	}
	core.NewAgencyEntityFunc = func(client *core.UsaspendingSDK, entopts map[string]any) core.UsaspendingEntity {
		return entity.NewAgencyEntity(client, entopts)
	}
	core.NewAwardEntityFunc = func(client *core.UsaspendingSDK, entopts map[string]any) core.UsaspendingEntity {
		return entity.NewAwardEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.UsaspendingSDK, entopts map[string]any) core.UsaspendingEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewSpendingEntityFunc = func(client *core.UsaspendingSDK, entopts map[string]any) core.UsaspendingEntity {
		return entity.NewSpendingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewUsaspendingSDK = core.NewUsaspendingSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
