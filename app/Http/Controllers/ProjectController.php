<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    // public $imageCategories = ['landscape', 'macro', 'wildlife', 'aerial', 'underwater', 'time_lapse', 'panoramic', 'abstract_nature', 'seasonal', 'night_sky', 'nature_textures', 'botanical_illustrations', 'environmental_impact', 'sunrise_and_sunset', 'natural_phenomena', 'sustainable_agriculture'];
    /**
     * Display a listing of the resource.
     */

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

        return inertia('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            "success" => session("success"),
            "feature" => Project::getImageCategories()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create', [
            "feature" => Project::getImageCategories()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('project_images', 'public'); // Store in the 'public' disk
            $data['image_path'] = $imagePath; // Add image path to the data array
        }

        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        Project::create($data);
        return to_route('project.index')
            ->with("success", "Project created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
