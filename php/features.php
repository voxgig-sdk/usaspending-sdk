<?php
declare(strict_types=1);

// Usaspending SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UsaspendingFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UsaspendingBaseFeature();
            case "test":
                return new UsaspendingTestFeature();
            default:
                return new UsaspendingBaseFeature();
        }
    }
}
