<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Department;

class UpdateDepartmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $department = $this->route('department');

        return [
            'name' => 'required|string|max:255|unique:departments,name,' . $department->id,
            'code' => 'required|string|max:50|unique:departments,code,' . $department->id,
            'email' => 'required|email|max:255|unique:departments,email,' . $department->id,
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
