<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PromoStoreRequest extends FormRequest
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
            'discount' => ['required', 'integer', 'min:5000'],
            'valid_start_date' => ['required', 'date'],
            'valid_end_date' => ['required', 'date', 'after:valid_start_date'],
            'description' => ['required', 'string'],
            'image' => ['required', 'file', 'max:' . (10 * 1024 * 1024), 'mimes:jpeg,bmp,png,gif'],
        ];
    }
}
