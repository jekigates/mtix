<?php

namespace App\Http\Requests\Admin;

use App\Enums\ProductStatusesEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'description' => ['required', 'string', 'max:100'],
            'recipe' => ['required', 'string'],
            'category_id' => ['required', 'string', 'max:36'],
            'variants.*.name' => ['required', 'string', 'max:50'],
            'variants.*.price' => ['required', 'integer', 'min:1'],
            'image' => ['required', 'file', 'max:' . (10 * 1024 * 1024), 'mimes:jpeg,bmp,png,gif'],
            'status' => ['required', Rule::in(ProductStatusesEnum::toArray())]
        ];
    }
}
