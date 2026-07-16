<?php
declare(strict_types=1);

// Usaspending SDK base feature

class UsaspendingBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UsaspendingContext $ctx, array $options): void {}
    public function PostConstruct(UsaspendingContext $ctx): void {}
    public function PostConstructEntity(UsaspendingContext $ctx): void {}
    public function SetData(UsaspendingContext $ctx): void {}
    public function GetData(UsaspendingContext $ctx): void {}
    public function GetMatch(UsaspendingContext $ctx): void {}
    public function SetMatch(UsaspendingContext $ctx): void {}
    public function PrePoint(UsaspendingContext $ctx): void {}
    public function PreSpec(UsaspendingContext $ctx): void {}
    public function PreRequest(UsaspendingContext $ctx): void {}
    public function PreResponse(UsaspendingContext $ctx): void {}
    public function PreResult(UsaspendingContext $ctx): void {}
    public function PreDone(UsaspendingContext $ctx): void {}
    public function PreUnexpected(UsaspendingContext $ctx): void {}
}
