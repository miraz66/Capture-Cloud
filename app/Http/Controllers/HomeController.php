<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public $imageCategories = ['landscape', 'macro', 'wildlife', 'aerial', 'underwater', 'time_lapse', 'panoramic', 'abstract_nature', 'seasonal', 'night_sky', 'nature_textures', 'botanical_illustrations', 'environmental_impact', 'sunrise_and_sunset', 'natural_phenomena', 'sustainable_agriculture'];
    public function index()
    {

        $query = Project::query();
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('id')) {
            $query->where('id', 'like', '%' . request('id') . '%');
        }

        if (request('feature')) {
            $query->where('feature', request('feature'));
        }

        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Home/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            "success" => session("success"),
            "feature" => $this->imageCategories

        ]);
    }
}
