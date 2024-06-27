<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['feature', 'image_path', 'description', 'address', 'created_by', 'updated_by'];

    public static $imageCategories = [
        'Abstract',
        'Aerial',
        'Animals',
        'Architecture',
        'Art',
        'Automotive',
        'Backgrounds',
        'Beauty',
        'Black and White',
        'Blogs',
        'Business',
        'Celebrities',
        'Cityscapes',
        'Commercial',
        'Computers',
        'Conceptual',
        'Creative',
        'Culture',
        'Dance',
        'Design',
        'Documentary',
        'Dramatic',
        'Education',
        'Emotions',
        'Environmental',
        'Events',
        'Family',
        'Fashion',
        'Festivals',
        'Fine Art',
        'Fitness',
        'Food',
        'Gardens',
        'Health',
        'Hobbies',
        'Holidays',
        'Home',
        'Industrial',
        'Interior Design',
        'Jewelry',
        'Journals',
        'Kids',
        'Landscape',
        'Lifestyle',
        'Love',
        'Macro',
        'Medical',
        'Minimalism',
        'Mobile',
        'Monochrome',
        'Mountains',
        'Music',
        'Nature',
        'News',
        'Night',
        'Ocean',
        'Outdoors',
        'Patterns',
        'People',
        'Performance',
        'Pets',
        'Plants',
        'Portraits',
        'Real Estate',
        'Religion',
        'Rural',
        'Science',
        'Seasons',
        'Shopping',
        'Signs',
        'Social Media',
        'Space',
        'Sports',
        'Still Life',
        'Street',
        'Summer',
        'Technology',
        'Textures',
        'Time-lapse',
        'Tourism',
        'Transportation',
        'Travel',
        'Trees',
        'Typography',
        'Urban',
        'Vintage',
        'Water',
        'Weather',
        'Wellness',
        'Wildlife',
        'Winter',
        'Workplace',
        'Yoga',
        'Zen',
        'Architecture & Interiors',
        'Street Photography',
        '3D Renders',
        'Spirituality',
        'Athletics',
        'Editorial',
        'Experimental',
        'Film',
        'Fashion & Beauty',
        'Interiors',
        'Business & Work',
        'Colorful',
        'History',
        'Night Sky',
        'Seasonal Events',
        'Sustainable Agriculture',
        'Natural Phenomena',
        'Botanical Illustrations',
        'Environmental Impact',
        'Sunrise and Sunset',
        'Sustainable Living',
        'Technology Innovations',
        'Adventure',
        'Artistic Photography',
        'Aesthetic',
        'Urban Exploration',
        'Candid Moments',
        'Family Gatherings',
        'Cultural Events',
        'Photographic Art',
        'Nature Textures',
        'Panoramic Views',
        ' Lifestyle Photography',
        'Travel Diaries',
        'Architectural Marvels',
        'Environmental Awareness',
        'Street Art',
        'Iconic Landmarks',
        'Historical Moments',
        'Culinary Arts',
        'Festive Celebrations'
    ];

    public static function getImageCategories()
    {
        return self::$imageCategories;
    }

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
