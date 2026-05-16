<?php
declare(strict_types=1);

// Usaspending SDK utility: result_headers

class UsaspendingResultHeaders
{
    public static function call(UsaspendingContext $ctx): ?UsaspendingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
