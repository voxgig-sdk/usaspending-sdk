<?php
declare(strict_types=1);

// Usaspending SDK utility: prepare_headers

class UsaspendingPrepareHeaders
{
    public static function call(UsaspendingContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
