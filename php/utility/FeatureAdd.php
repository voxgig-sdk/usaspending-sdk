<?php
declare(strict_types=1);

// Usaspending SDK utility: feature_add

class UsaspendingFeatureAdd
{
    public static function call(UsaspendingContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
