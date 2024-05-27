<?php

namespace App\Enums;

enum ProductStatusesEnum: string
{
    case DRAFT = 'draft';
    case ACTIVE = 'active';
    case ARCHIVED = 'archived';

    // extra helper to allow for greater customization of displayed values, without disclosing the name/value data directly
    public function label(): string
    {
        return match ($this) {
            static::DRAFT => 'Draft',
            static::ACTIVE => 'Active',
            static::ARCHIVED => 'Archived',
        };
    }

    public static function toArray(): array
    {
        return array_column(ProductStatusesEnum::cases(), 'value');
    }
}
