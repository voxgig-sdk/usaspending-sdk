<?php
declare(strict_types=1);

// Usaspending SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

UsaspendingUtility::setRegistrar(function (UsaspendingUtility $u): void {
    $u->clean = [UsaspendingClean::class, 'call'];
    $u->done = [UsaspendingDone::class, 'call'];
    $u->make_error = [UsaspendingMakeError::class, 'call'];
    $u->feature_add = [UsaspendingFeatureAdd::class, 'call'];
    $u->feature_hook = [UsaspendingFeatureHook::class, 'call'];
    $u->feature_init = [UsaspendingFeatureInit::class, 'call'];
    $u->fetcher = [UsaspendingFetcher::class, 'call'];
    $u->make_fetch_def = [UsaspendingMakeFetchDef::class, 'call'];
    $u->make_context = [UsaspendingMakeContext::class, 'call'];
    $u->make_options = [UsaspendingMakeOptions::class, 'call'];
    $u->make_request = [UsaspendingMakeRequest::class, 'call'];
    $u->make_response = [UsaspendingMakeResponse::class, 'call'];
    $u->make_result = [UsaspendingMakeResult::class, 'call'];
    $u->make_point = [UsaspendingMakePoint::class, 'call'];
    $u->make_spec = [UsaspendingMakeSpec::class, 'call'];
    $u->make_url = [UsaspendingMakeUrl::class, 'call'];
    $u->param = [UsaspendingParam::class, 'call'];
    $u->prepare_auth = [UsaspendingPrepareAuth::class, 'call'];
    $u->prepare_body = [UsaspendingPrepareBody::class, 'call'];
    $u->prepare_headers = [UsaspendingPrepareHeaders::class, 'call'];
    $u->prepare_method = [UsaspendingPrepareMethod::class, 'call'];
    $u->prepare_params = [UsaspendingPrepareParams::class, 'call'];
    $u->prepare_path = [UsaspendingPreparePath::class, 'call'];
    $u->prepare_query = [UsaspendingPrepareQuery::class, 'call'];
    $u->result_basic = [UsaspendingResultBasic::class, 'call'];
    $u->result_body = [UsaspendingResultBody::class, 'call'];
    $u->result_headers = [UsaspendingResultHeaders::class, 'call'];
    $u->transform_request = [UsaspendingTransformRequest::class, 'call'];
    $u->transform_response = [UsaspendingTransformResponse::class, 'call'];
});
