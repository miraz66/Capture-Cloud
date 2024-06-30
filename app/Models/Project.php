<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['feature', 'image_path', 'description', 'address', 'created_by', 'updated_by'];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function likes()
    {
        return $this->belongsToMany(User::class, 'project_likes');
    }

    public function collections()
    {
        return $this->belongsToMany(User::class, 'project_collections');
    }

    public function toggleLike()
    {
        $this->likes()->toggle(Auth::id());
    }

    public function addToCollection()
    {
        $this->collections()->attach(Auth::id());
    }

    public function removeFromCollection()
    {
        $this->collections()->detach(Auth::id());
    }
}
