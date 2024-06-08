<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => ["required", "image"],
            "feature" => ["required", Rule::in(['landscape', 'macro', 'wildlife', 'aerial', 'underwater', 'time_lapse', 'panoramic', 'abstract_nature', 'seasonal', 'night_sky', 'nature_textures', 'botanical_illustrations', 'environmental_impact', 'sunrise_and_sunset', 'natural_phenomena', 'sustainable_agriculture'])],
            "address" => ["required", "string"],
            "description" => ["nullable","string"],
        ];
    }
}
