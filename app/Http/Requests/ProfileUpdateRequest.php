<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
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
            'email' => ['required', 'string', 'lowercase', 'email', 'max:50', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone_number' => ['required', 'string', 'max:16', Rule::unique(User::class)->ignore($this->user()->id)],
            'address' => ['required', 'string', 'max:100'],
            'province' => ['required', 'string', 'max:50'],
            'city' => ['required', 'string', 'max:50'],
            'gender' => ['required', Rule::in(['Male', 'Female'])],
            'dob' => ['required', 'date', 'before:tomorrow'],
        ];
    }
}
