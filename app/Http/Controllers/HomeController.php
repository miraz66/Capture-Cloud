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
            $query->where('feature', 'like', '%' . request('feature') . '%');
        }

        $projects = $query->orderBy($sortField, $sortDirection)->get();
        $noResults = $projects->isEmpty();

        return inertia('Home/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            "success" => session("success"),
            "feature" => $this->imageCategories,
            'noResults' => $noResults
        ]);
    }

    public function likeProject($id)
    {
        $project = Project::findOrFail($id);
        $project->toggleLike();
        // dd($project);

        return response()->json(['success' => true]);
    }

    public function addToCollection($id)
    {
        $project = Project::findOrFail($id);
        $project->addToCollection();

        return response()->json(['success' => true]);
    }

    public function removeFromCollection($id)
    {
        $project = Project::findOrFail($id);
        $project->removeFromCollection();

        return response()->json(['success' => true]);
    }
}
