<?php
declare(strict_types=1);

// Usaspending SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UsaspendingMakeContext
{
    public static function call(array $ctxmap, ?UsaspendingContext $basectx): UsaspendingContext
    {
        return new UsaspendingContext($ctxmap, $basectx);
    }
}
