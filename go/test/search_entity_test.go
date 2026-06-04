package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/usaspending-sdk/go"
	"github.com/voxgig-sdk/usaspending-sdk/go/core"

	vs "github.com/voxgig-sdk/usaspending-sdk/go/utility/struct"
)

func TestSearchEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Search(nil)
		if ent == nil {
			t.Fatal("expected non-nil SearchEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := searchBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "search." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set USASPENDING_TEST_SEARCH_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		searchRef01Ent := client.Search(nil)
		searchRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "search"}, setup.data), "search_ref01"))

		searchRef01DataResult, err := searchRef01Ent.Create(searchRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		searchRef01Data = core.ToMapAny(searchRef01DataResult)
		if searchRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func searchBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "search", "SearchTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read search test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse search test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"search01", "search02", "search03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("USASPENDING_TEST_SEARCH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"USASPENDING_TEST_SEARCH_ENTID": idmap,
		"USASPENDING_TEST_LIVE":      "FALSE",
		"USASPENDING_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["USASPENDING_TEST_SEARCH_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["USASPENDING_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewUsaspendingSDK(core.ToMapAny(mergedOpts))
	}

	live := env["USASPENDING_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["USASPENDING_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
