<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'feature' => $this->feature,
            // 'image_path' => $this->image_path, //? Storage::url($this->image_path) : null,
            'image_path' => $this->image_path ? $this->image_path : Storage::url($this->image_path),
            'address' => $this->address,
            'created_at' => (new Carbon($this->created_at))->format('F-d-Y'),
            'updated_at' => (new Carbon($this->updated_at))->format('F-d-Y'),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}

