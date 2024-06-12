<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AccountUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'address' => ['required', 'string', 'max:100'],
            'province_id' => ['required', 'string', 'max:36'],
            'city_id' => ['required', 'string', 'max:36'],
            'gender' => ['required', Rule::in(['male', 'female'])],
            'dob' => ['required', 'date', 'before:-17 years'],
        ];
    }
}
