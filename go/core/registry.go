package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAccountEntityFunc func(client *UsaspendingSDK, entopts map[string]any) UsaspendingEntity

var NewAgencyEntityFunc func(client *UsaspendingSDK, entopts map[string]any) UsaspendingEntity

var NewAwardEntityFunc func(client *UsaspendingSDK, entopts map[string]any) UsaspendingEntity

var NewSearchEntityFunc func(client *UsaspendingSDK, entopts map[string]any) UsaspendingEntity

var NewSpendingEntityFunc func(client *UsaspendingSDK, entopts map[string]any) UsaspendingEntity

