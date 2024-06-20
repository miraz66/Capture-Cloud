<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;

Route::redirect('/', '/home');
Route::get('/home', [HomeController::class, "index"])->name('home');
Route::post('/projects/{id}/like', [HomeController::class, 'likeProject'])->name('projects.like');
Route::post('/projects/{id}/add-to-collection', [HomeController::class, 'addToCollection'])->name('projects.add_to_collection');
Route::post('/projects/{id}/remove-from-collection', [HomeController::class, 'removeFromCollection'])->name('projects.remove_from_collection');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, "index"])->name('dashboard');

    Route::resource('project', ProjectController::class);
    // Route::resource('user', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
