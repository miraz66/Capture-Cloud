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
        $createdAt = Carbon::parse($this->created_at)
            ->locale('en')
            ->timezone('Asia/Dhaka')
            ->isoFormat('dddd, MMMM D, YYYY [at] h:mm A');

        $updated_at = Carbon::parse($this->due_date)
            ->locale('en')
            ->timezone('Asia/Dhaka')
            ->isoFormat('dddd, MMMM D, YYYY [at] h:mm A');

        return [
            'id' => $this->id,
            'description' => $this->description,
            'feature' => $this->feature,
            // 'image_path' => $this->image_path, //? Storage::url($this->image_path) : null,
            'image_path' => $this->image_path ? $this->image_path : Storage::url($this->image_path),
            'address' => $this->address,
            'created_at' => $createdAt,
            'updated_at' => $updated_at,
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
