<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
/**
 * @OA\Schema(
 *     schema="StoreDepartmentRequest",
 *     type="object",
 *     required={"name", "code"},
 *     @OA\Property(property="name", type="string", example="Finance"),
 *     @OA\Property(property="code", type="string", example="FIN"),
 *     @OA\Property(property="type", type="string", example="Administrative")
 * )
 */
class StoreDepartmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:departments,name',
            'code' => 'required|string|max:50|unique:departments,code',
            'email' => 'required|email|max:255|unique:departments,email',
            'phone' => 'required|string|max:20|regex:/^[\d\s\-\+\(\)]+$/',
        ];
    }

    public function messages()
    {
        return [
            'phone.regex' => 'The phone number format is invalid.',
        ];
    }
}
