<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class LocationStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'contact' => ['required', 'string', 'max:16', 'unique:locations'],
            'address' => ['required', 'string', 'max:100'],
            'province_id' => ['required', 'string', 'max:36'],
            'city_id' => ['required', 'string', 'max:36'],
            'user_id' => ['required', 'string', 'max:36'],
            'brands' => ['required', 'array'],
            'brands.*' => ['required', 'exists:brands,id'],
        ];
    }
}
