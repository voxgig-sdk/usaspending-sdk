<?php
declare(strict_types=1);

// Usaspending SDK utility: prepare_body

class UsaspendingPrepareBody
{
    public static function call(UsaspendingContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
