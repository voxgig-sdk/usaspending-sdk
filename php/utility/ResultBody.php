<?php
declare(strict_types=1);

// Usaspending SDK utility: result_body

class UsaspendingResultBody
{
    public static function call(UsaspendingContext $ctx): ?UsaspendingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
