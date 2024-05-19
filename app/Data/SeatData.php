<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SeatData extends Data
{
    public function __construct(
        public string $id,
        public string $studio_id,
        public string $row_code,
        public int $column_number,
    ) {}
}
